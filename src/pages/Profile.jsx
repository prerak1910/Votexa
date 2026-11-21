import { useNavigate } from "react-router-dom";

import {
    UserRound,
    Mail,
    CalendarDays,
    LogOut,
    ShieldCheck
} from "lucide-react";

function Profile() {
    const navigate = useNavigate();

    const user = JSON.parse(
        sessionStorage.getItem("user") || "{}"
    );

    function handleLogout() {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user");

        navigate("/login", { replace: true });
    }

    const initials = user.name
        ? user.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
        : "U";

    return (
        <div className="max-w-5xl mx-auto">

            {/* Page Heading */}
            <div className="mb-9">

                <p className="text-xs font-bold tracking-[0.18em] uppercase text-indigo-600 mb-3">
                    Account
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    My Profile
                </h2>

                <p className="text-slate-500 mt-3 text-base md:text-lg">
                    Manage your personal information and account details.
                </p>

            </div>

            {/* Profile Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                {/* Profile Header */}
                <div className="p-8 bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-slate-100">

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

                        <div className="h-20 w-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-200">
                            {initials}
                        </div>

                        <div className="text-center sm:text-left">

                            <h3 className="text-2xl font-bold text-slate-900">
                                {user.name || "User"}
                            </h3>

                            <p className="text-slate-500 mt-1">
                                {user.email || "Email not available"}
                            </p>

                            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-white rounded-full border border-indigo-100 text-indigo-700 text-xs font-semibold">
                                <ShieldCheck size={14} />
                                Votexa Member
                            </div>

                        </div>

                    </div>

                </div>

                {/* Personal Information */}
                <div className="p-8">

                    <h3 className="text-lg font-bold text-slate-900 mb-6">
                        Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">

                            <div className="flex items-center gap-3 mb-3">
                                <UserRound size={19} className="text-indigo-600" />

                                <span className="text-sm text-slate-500">
                                    Full Name
                                </span>
                            </div>

                            <p className="font-semibold text-slate-900">
                                {user.name || "Not available"}
                            </p>

                        </div>

                        {/* Email */}
                        <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">

                            <div className="flex items-center gap-3 mb-3">
                                <Mail size={19} className="text-indigo-600" />

                                <span className="text-sm text-slate-500">
                                    Email Address
                                </span>
                            </div>

                            <p className="font-semibold text-slate-900 break-all">
                                {user.email || "Not available"}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Account Actions */}
                <div className="px-8 py-7 border-t border-slate-100">

                    <h3 className="text-lg font-bold text-slate-900">
                        Account Actions
                    </h3>

                    <p className="text-sm text-slate-500 mt-2 mb-5">
                        Sign out of your Votexa account on this device.
                    </p>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Profile;