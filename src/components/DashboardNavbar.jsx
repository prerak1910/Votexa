import {
    Bell,
    Plus,
    ShieldCheck,
    Menu
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function DashboardNavbar({ onMenuClick }) {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between bg-white px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">

            {/* Left Section */}
            <div className="flex items-center gap-3">

                {/* Mobile/Tablet Menu Button */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <Menu size={24} className="text-slate-700" />
                </button>

                {/* Website Branding */}
                <div className="flex items-center gap-2">
                    <ShieldCheck
                        size={30}
                        className="text-indigo-600"
                    />

                    <h1 className="text-2xl font-bold text-slate-800">
                        Votexa
                    </h1>
                </div>

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-5">

                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <Bell size={22} className="text-gray-600" />

                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Create Election */}
                <button
                    type="button"
                    onClick={() => navigate("/create-election")}
                    className="flex items-center gap-2 px-3 sm:px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                >
                    <Plus size={19} />

                    <span className="hidden sm:inline">
                        Create Election
                    </span>

                    <span className="sm:hidden">
                        Create
                    </span>
                </button>

            </div>
        </header>
    );
}

export default DashboardNavbar;