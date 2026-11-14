from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

@app.route("/")
def home():
    return "Welcome to Votexa Backend!"

@app.route("/api/status")
def status():
    return jsonify({
    "project": "Votexa",
    "status": "Development",
    "message": "Backend is working successfully!"
    })

@app.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Invalid JSON data"
        }), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "All fields are required"
        }), 400

    return jsonify({
        "success": True,
        "message": "Registration data received successfully!",
        "user": {
            "name": name,
            "email": email
        }
    }), 200

if __name__ == "__main__":
    app.run(debug=True)