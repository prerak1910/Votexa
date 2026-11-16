
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from datetime import timedelta
import os

# Load environment variables
load_dotenv()

# Initialize Flask
app = Flask(__name__)

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Configure CORS
CORS(app, origins=["http://localhost:5173"])


# ---------------- USER MODEL ----------------

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)


# ---------------- HOME ROUTE ----------------

@app.route("/")
def home():
    return "Welcome to Votexa Backend!"


# ---------------- STATUS ROUTE ----------------

@app.route("/api/status")
def status():

    return jsonify({
        "project": "Votexa",
        "status": "Development",
        "message": "Backend is working successfully!"
    })


# ---------------- DATABASE TEST ROUTE ----------------

@app.route("/api/test-db")
def test_db():

    try:
        users = User.query.all()

        return jsonify({
            "success": True,
            "message": "Database connected successfully!",
            "users": [
                {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }
                for user in users
            ]
        })

    except Exception:
        app.logger.exception("Database connection test failed")

        return jsonify({
            "success": False,
            "message": "Unable to retrieve database records."
        }), 500


# ---------------- REGISTER ROUTE ----------------

@app.route("/api/register", methods=["POST"])
def register():

    # Read JSON data
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "success": False,
            "message": "Invalid JSON data."
        }), 400

    # Extract registration details
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Validate input types
    if not all(isinstance(value, str) for value in [name, email, password]):
        return jsonify({
            "success": False,
            "message": "All fields must be valid text."
        }), 400

    # Clean input
    name = name.strip()
    email = email.strip().lower()

    # Validate required fields
    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    # Validate lengths
    if len(name) > 100 or len(email) > 150 or len(password) > 1024:
        return jsonify({
            "success": False,
            "message": "One or more fields exceed the allowed length."
        }), 400

    # Basic email validation
    if "@" not in email or "." not in email.split("@")[-1]:
        return jsonify({
            "success": False,
            "message": "Please enter a valid email address."
        }), 400

    # Check whether email already exists
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email is already registered. Please login."
        }), 409

    try:

        # Hash password
        hashed_password = generate_password_hash(password)

        # Create new user
        new_user = User(
            name=name,
            email=email,
            password_hash=hashed_password
        )

        # Save user to PostgreSQL
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Registration successful!",
            "user": {
                "id": new_user.id,
                "name": new_user.name,
                "email": new_user.email
            }
        }), 201

    except IntegrityError:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": "Email is already registered. Please login."
        }), 409

    except Exception:

        db.session.rollback()
        app.logger.exception("Registration failed")

        return jsonify({
            "success": False,
            "message": "Something went wrong. Please try again."
        }), 500


# ---------------- LOGIN ENDPOINT ----------------

@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "success": False,
            "message": "Invalid JSON data."
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not isinstance(email, str) or not isinstance(password, str):
        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    email = email.strip().lower()

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    user = User.query.filter_by(email=email).first()

    if user is None or not check_password_hash(user.password_hash, password):
        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    access_token = create_access_token(
    identity=str(user.id)
    )

    return jsonify({
        "success": True,
        "message": "Login successful!",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 200

@app.route("/api/profile", methods=["GET"])
@jwt_required()
def profile():

    user_id = get_jwt_identity()

    user = db.session.get(User, int(user_id))

    if user is None:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 200

# ---------------- RUN APPLICATION ----------------

if __name__ == "__main__":
    app.run(debug=True)
