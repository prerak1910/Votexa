import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck, Eye, EyeOff, Vote, Users,
    ChartNoAxesCombined, CheckCircle2, ArrowRight
} from 'lucide-react';

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [emailTouched, setEmailTouched] = useState(false);

    useEffect(() => {
        document.title = "Create Account | Votexa";
    }, []);

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    // Password strength calculation
    function getPasswordStrength(value) {

        let score = 0;

        if (value.length >= 8) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[a-z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        return score;
    }

    const strength = getPasswordStrength(password);

    const strengthLabel = [
        "Very weak",
        "Very weak",
        "Weak",
        "Fair",
        "Strong",
        "Very strong"
    ];

    // Validate complete form
    function validateForm() {

        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!isValidEmail(email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must contain at least 8 characters";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    // Name validation
    function handleNameChange(e) {

        const value = e.target.value;
        setName(value);

        if (errors.name) {
            setErrors(prev => ({
                ...prev,
                name: value.trim() ? "" : "Name is required"
            }));
        }
    }

    // Email validation
    function handleEmailChange(e) {

        const value = e.target.value;
        setEmail(value);

        if (emailTouched) {
            setErrors(prev => ({
                ...prev,
                email: !value.trim()
                    ? "Email is required"
                    : !isValidEmail(value)
                        ? "Enter a valid email address"
                        : ""
            }));
        }
    }

    // Validate email when user leaves the field
    function handleEmailBlur() {

        setEmailTouched(true);

        setErrors(prev => ({
            ...prev,
            email: !email.trim()
                ? "Email is required"
                : !isValidEmail(email)
                    ? "Enter a valid email address"
                    : ""
        }));
    }

    // Password validation
    function handlePasswordChange(e) {

        const value = e.target.value;
        setPassword(value);

        setErrors(prev => ({
            ...prev,

            password: !value
                ? "Password is required"
                : value.length < 8
                    ? "Password must contain at least 8 characters"
                    : "",

            confirmPassword:
                confirmPassword && value !== confirmPassword
                    ? "Passwords do not match"
                    : confirmPassword
                        ? ""
                        : prev.confirmPassword
        }));
    }

    // Confirm password validation
    function handleConfirmPasswordChange(e) {

        const value = e.target.value;
        setConfirmPassword(value);

        setErrors(prev => ({
            ...prev,
            confirmPassword: !value
                ? "Please confirm your password"
                : value !== password
                    ? "Passwords do not match"
                    : ""
        }));
    }

    // Form submission
    function handleSubmit(event) {

        event.preventDefault();

        setEmailTouched(true);

        if (!validateForm()) return;

        alert("Registration form submitted successfully!");
    }

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8">

            <div className="w-full max-w-6xl min-h-[680px] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* LEFT BRANDING PANEL */}

                <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 p-8 md:p-12 flex flex-col justify-between text-white">

                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>

                    <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

                    {/* Logo */}

                    <div className="relative z-10 flex items-center gap-3">

                        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20">
                            <ShieldCheck size={30} />
                        </div>

                        <span className="text-2xl font-bold tracking-wide">
                            Votexa
                        </span>

                    </div>

                    {/* Main Content */}

                    <div className="relative z-10 my-12">

                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-indigo-100 mb-7">

                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>

                            Join the Votexa Community

                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">

                            Be Part of
                            <br />

                            Every Decision.

                            <br />

                            <span className="text-indigo-300">
                                Make Your Voice Count.
                            </span>

                        </h1>

                        <p className="text-indigo-100/80 text-lg leading-relaxed max-w-md">

                            Create your account and experience a smarter, simpler way to participate in organized elections.

                        </p>

                        {/* Feature Cards */}

                        <div className="mt-10 space-y-4">

                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">

                                <div className="bg-indigo-400/20 p-3 rounded-lg">
                                    <Vote size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Make Your Vote Count
                                    </h3>

                                    <p className="text-sm text-indigo-200/70">
                                        Participate in organized elections.
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">

                                <div className="bg-indigo-400/20 p-3 rounded-lg">
                                    <Users size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Stay Connected
                                    </h3>

                                    <p className="text-sm text-indigo-200/70">
                                        Explore candidates and election updates.
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">

                                <div className="bg-indigo-400/20 p-3 rounded-lg">
                                    <ChartNoAxesCombined size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Explore Insights
                                    </h3>

                                    <p className="text-sm text-indigo-200/70">
                                        Understand election participation.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="relative z-10 text-sm text-indigo-200/60">
                        © 2026 Votexa. All rights reserved.
                    </div>

                </div>


                {/* RIGHT REGISTRATION PANEL */}

                <div className="flex items-center justify-center p-8 md:p-12">

                    <div className="w-full max-w-md">

                        {/* Heading */}

                        <div className="mb-8">

                            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">
                                Get Started
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900">
                                Create your account
                            </h2>

                            <p className="text-slate-500 mt-2">
                                Join Votexa and participate in elections.
                            </p>

                        </div>


                        <form onSubmit={handleSubmit} noValidate>

                            {/* Full Name */}

                            <div className="mb-5">

                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder="Enter your full name"
                                    aria-invalid={!!errors.name}
                                    className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-4 ${
                                        errors.name
                                            ? "border-red-500 focus:ring-red-100"
                                            : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                                    }`}
                                />

                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.name}
                                    </p>
                                )}

                            </div>


                            {/* Email */}

                            <div className="mb-5">

                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={handleEmailBlur}
                                    placeholder="you@example.com"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-4 ${
                                        errors.email
                                            ? "border-red-500 focus:ring-red-100"
                                            : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                                    }`}
                                />

                                {errors.email && (
                                    <p id="email-error" className="text-red-500 text-sm mt-2">
                                        {errors.email}
                                    </p>
                                )}

                                {email && emailTouched && !errors.email && isValidEmail(email) && (
                                    <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                                        <CheckCircle2 size={15} />
                                        Valid email address
                                    </p>
                                )}

                            </div>


                            {/* Password */}

                            <div className="mb-5">

                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Password
                                </label>

                                <div className="relative">

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        placeholder="Minimum 8 characters"
                                        aria-invalid={!!errors.password}
                                        className={`w-full border rounded-xl px-4 py-3 pr-12 outline-none transition focus:ring-4 ${
                                            errors.password
                                                ? "border-red-500 focus:ring-red-100"
                                                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                                        }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 cursor-pointer transition"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword
                                            ? <EyeOff size={20} />
                                            : <Eye size={20} />
                                        }
                                    </button>

                                </div>

                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.password}
                                    </p>
                                )}

                                {/* Password Strength */}

                                {password && (

                                    <div className="mt-3">

                                        <div className="flex justify-between text-xs mb-2">

                                            <span className="text-slate-500">
                                                Password strength
                                            </span>

                                            <span className={`font-semibold ${
                                                strength <= 2
                                                    ? "text-red-500"
                                                    : strength <= 3
                                                        ? "text-amber-500"
                                                        : "text-green-600"
                                            }`}>
                                                {strengthLabel[strength]}
                                            </span>

                                        </div>

                                        <div className="flex gap-1.5">

                                            {[1, 2, 3, 4, 5].map((level) => (

                                                <div
                                                    key={level}
                                                    className={`h-1.5 flex-1 rounded-full transition ${
                                                        strength >= level
                                                            ? strength <= 2
                                                                ? "bg-red-500"
                                                                : strength <= 3
                                                                    ? "bg-amber-500"
                                                                    : "bg-green-500"
                                                            : "bg-slate-200"
                                                    }`}
                                                />

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </div>


                            {/* Confirm Password */}

                            <div className="mb-7">

                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Confirm Password
                                </label>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Re-enter your password"
                                    aria-invalid={!!errors.confirmPassword}
                                    className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-4 ${
                                        errors.confirmPassword
                                            ? "border-red-500 focus:ring-red-100"
                                            : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                                    }`}
                                />

                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.confirmPassword}
                                    </p>
                                )}

                                {confirmPassword && password === confirmPassword && (
                                    <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                                        <CheckCircle2 size={15} />
                                        Passwords match
                                    </p>
                                )}

                            </div>


                            {/* Submit Button */}

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition cursor-pointer flex items-center justify-center gap-2"
                            >
                                Create Account
                                <ArrowRight size={18} />
                            </button>

                        </form>


                        {/* Login Navigation */}

                        <div className="mt-8 text-center">

                            <p className="text-sm text-slate-500">

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="text-indigo-600 font-bold ml-1 hover:text-indigo-800 cursor-pointer transition"
                                >
                                    Sign in
                                </Link>

                            </p>

                        </div>


                        {/* Footer */}

                        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">

                            <ShieldCheck size={15} />

                            Your election experience starts here.

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Register;