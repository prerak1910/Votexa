
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Eye, EyeOff, ShieldCheck, CheckCircle2,
    Vote, Users, ChartNoAxesCombined, ArrowRight
} from 'lucide-react';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.title = "Login | Votexa";
    }, []);

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    function validateForm() {

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!isValidEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function handleEmailChange(e) {

        const value = e.target.value;
        setEmail(value);

        if (errors.email) {
            setErrors(prev => ({
                ...prev,
                email: !value.trim()
                    ? "Email is required"
                    : !isValidEmail(value)
                        ? "Please enter a valid email address"
                        : ""
            }));
        }
    }

    function handlePasswordChange(e) {

        const value = e.target.value;
        setPassword(value);

        if (errors.password) {
            setErrors(prev => ({
                ...prev,
                password: !value.trim()
                    ? "Password is required"
                    : ""
            }));
        }
    }

    async function handleSubmit(event) {

        event.preventDefault();

        if (loading) return;

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Temporary login simulation
            await new Promise(resolve => setTimeout(resolve, 2000));

            alert("Login form submitted successfully!");

        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8">

            <div className="w-full max-w-6xl min-h-[680px] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* LEFT BRANDING PANEL */}

                <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 p-8 md:p-12 flex flex-col justify-between text-white">

                    {/* Decorative Background */}

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

                            Smarter Election Management

                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">

                            Your Voice.
                            <br />

                            Your Choice.
                            <br />

                            <span className="text-indigo-300">
                                Your Election.
                            </span>

                        </h1>

                        <p className="text-indigo-100/80 text-lg leading-relaxed max-w-md">

                            A smarter way to organize elections, manage candidates and empower every vote.

                        </p>

                        {/* Feature Cards */}

                        <div className="mt-10 space-y-4">

                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">

                                <div className="bg-indigo-400/20 p-3 rounded-lg">

                                    <Vote size={22} />

                                </div>

                                <div>

                                    <h3 className="font-semibold">
                                        Seamless Voting
                                    </h3>

                                    <p className="text-sm text-indigo-200/70">
                                        Simple and accessible election participation.
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">

                                <div className="bg-indigo-400/20 p-3 rounded-lg">

                                    <Users size={22} />

                                </div>

                                <div>

                                    <h3 className="font-semibold">
                                        Organized Elections
                                    </h3>

                                    <p className="text-sm text-indigo-200/70">
                                        Manage voters, candidates and election sessions.
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">

                                <div className="bg-indigo-400/20 p-3 rounded-lg">

                                    <ChartNoAxesCombined size={22} />

                                </div>

                                <div>

                                    <h3 className="font-semibold">
                                        Meaningful Insights
                                    </h3>

                                    <p className="text-sm text-indigo-200/70">
                                        Understand election participation and outcomes.
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


                {/* RIGHT LOGIN PANEL */}

                <div className="flex items-center justify-center p-8 md:p-14">

                    <div className="w-full max-w-md">

                        {/* Heading */}

                        <div className="mb-10">

                            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">

                                Welcome Back

                            </p>

                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">

                                Sign in to Votexa

                            </h2>

                            <p className="text-slate-500 mt-3">

                                Enter your credentials to access your account.

                            </p>

                        </div>


                        {/* Form */}

                        <form onSubmit={handleSubmit} noValidate>

                            {/* Email */}

                            <div className="mb-6">

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
                                    placeholder="you@example.com"
                                    aria-invalid={!!errors.email}
                                    className={`w-full border rounded-xl px-4 py-3.5 outline-none transition focus:ring-4 ${
                                        errors.email
                                            ? "border-red-500 focus:ring-red-100"
                                            : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                                    }`}
                                />

                                {errors.email && (

                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.email}
                                    </p>

                                )}

                                {email && !errors.email && isValidEmail(email) && (

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
                                        placeholder="Enter your password"
                                        aria-invalid={!!errors.password}
                                        className={`w-full border rounded-xl px-4 py-3.5 pr-12 outline-none transition focus:ring-4 ${
                                            errors.password
                                                ? "border-red-500 focus:ring-red-100"
                                                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                                        }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 cursor-pointer transition"
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

                            </div>


                            {/* Remember Me */}

                            <div className="flex items-center justify-between mb-8">

                                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 accent-indigo-600 cursor-pointer"
                                    />

                                    Remember me

                                </label>

                                <button
                                    type="button"
                                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer transition"
                                >
                                    Forgot password?
                                </button>

                            </div>


                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition cursor-pointer flex items-center justify-center gap-2"
                            >

                                {loading ? "Signing in..." : "Sign In"}

                                {!loading && <ArrowRight size={18} />}

                            </button>

                        </form>


                        {/* Register Link */}

                        <div className="mt-9 text-center">

                            <p className="text-sm text-slate-500">

                                Don't have an account?

                                <Link
                                    to="/register"
                                    className="text-indigo-600 font-bold ml-1 hover:text-indigo-800 cursor-pointer transition"
                                >
                                    Create account
                                </Link>

                            </p>

                        </div>


                        {/* Security Message */}

                        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">

                            <ShieldCheck size={15} />

                            Your election experience starts here.

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;
