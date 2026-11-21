import { Bell, Plus, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardNavbar() {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between bg-white px-8 py-4 border-b border-gray-200">

            {/* Website Branding */}
            <div className="flex items-center gap-2">
                <ShieldCheck size={30} className="text-indigo-600" />

                <h1 className="text-2xl font-bold text-slate-800">
                    Votexa
                </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-5">

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
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={19} />
                    Create Election
                </button>

            </div>
        </header>
    );
}

export default DashboardNavbar;