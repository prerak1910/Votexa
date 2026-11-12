import { useState, useEffect } from 'react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);  

        useEffect(() => {
        document.title = "Login | Votexa";
        }, []);

    // Validate email and password
    function validateForm() {

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    // Handle form submission
    async function handleSubmit(event) {

    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
        return;
    }

    setLoading(true);

    // Temporary simulation of a server request
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoading(false);

    alert("Login form submitted successfully!");
}

    return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                {/* Votexa Logo */}

                <div className="flex items-center justify-center gap-2 mb-8">

                    <ShieldCheck className="text-indigo-600" size={32} />

                    <h1 className="text-3xl font-bold text-slate-900">
                        Votexa
                    </h1>

                </div>


                {/* Heading */}

                <h2 className="text-2xl font-bold text-center text-slate-900">
                    Welcome back
                </h2>

                <p className="text-center text-slate-500 mt-2 mb-8">
                    Sign in to continue to your account.
                </p>


                {/* Login Form */}

                <form onSubmit={handleSubmit} noValidate>

                    {/* Email Field */}

                    <div className="mb-5">

                        <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
                        >
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors(prev => ({ ...prev, email: "" }));
                            }}
                            placeholder="you@example.com"
                            aria-invalid={!!errors.email}
                            className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.email ? "border-red-500" : "border-slate-300"
                            }`}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.email}
                            </p>
                        )}

                    </div>


                    {/* Password Field */}

                    <div className="mb-6">

                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-2"
                        >
                            Password
                        </label>

                        <div className="relative">

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors(prev => ({ ...prev, password: "" }));
                                }}
                                placeholder="Enter your password"
                                aria-invalid={!!errors.password}
                                className={`w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    errors.password ? "border-red-500" : "border-slate-300"
                                }`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
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

                    </div>
                    {/* Remember Me and Forgot Password */}

                    <div className="flex items-center justify-between mb-6">

                        <label className="flex items-center gap-2 text-sm text-slate-600">

                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="accent-indigo-600"
                            />

                            Remember me

                        </label>

                        <button
                            type="button"
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            Forgot password?
                        </button>

                    </div>

                    {/* Sign In Button */}

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                </form>


                {/* Create Account */}

                <p className="text-center text-sm text-slate-500 mt-8">

                    Don't have an account?

                    <span className="text-indigo-600 font-semibold ml-1 cursor-pointer">
                        Create account
                    </span>

                </p>

            </div>

        </div>

    );

}

export default Login;