import { Bell, LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardNavbar() {
    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    function handleLogout() {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user");

        navigate("/login");
    }

    return (
        <header className="flex items-center justify-between bg-white px-8 py-5 border-b border-gray-200">

            {/* Page title */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Dashboard
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Welcome back to Votexa
                </p>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-6">

                {/* Notification button */}
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Bell size={22} className="text-gray-600" />

                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User profile */}
                <div className="flex items-center gap-3">

                    <UserCircle size={38} className="text-indigo-600" />

                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800">
                            {user.name || "User"}
                        </p>

                        <p className="text-xs text-gray-500">
                            Votexa Member
                        </p>
                    </div>

                </div>

                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <LogOut size={18} />
                    <span className="hidden sm:block text-sm font-medium">
                        Logout
                    </span>
                </button>

            </div>
        </header>
    );
}

export default DashboardNavbar;