import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import StatCard from "../components/StatCard";
import RecentElections from "../components/RecentElections";
import { Plus } from "lucide-react";

import {
    Vote,
    Building2,
    Users,
    Activity
} from "lucide-react";  

function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main dashboard area */}
            <div className="flex-1">

                {/* Navbar */}
                <DashboardNavbar />

                {/* Dashboard content */}
                <main className="p-8">
                    <h2 className="text-3xl font-bold text-slate-800">
                        Overview
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Here's what's happening with your elections.
                    </p>
                     <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium">
                        <Plus size={20} />
                        Create Election
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                        <StatCard
                            title="Total Elections"
                            value="12"
                            icon={Vote}
                            color="bg-indigo-100 text-indigo-600"
                        />

                        <StatCard
                            title="Active Elections"
                            value="3"
                            icon={Activity}
                            color="bg-green-100 text-green-600"
                        />

                        <StatCard
                            title="Organizations"
                            value="5"
                            icon={Building2}
                            color="bg-orange-100 text-orange-600"
                        />

                        <StatCard
                            title="Total Voters"
                            value="1,240"
                            icon={Users}
                            color="bg-blue-100 text-blue-600"
                        />

                    </div>
                    <RecentElections />
                </main>

            </div>
        </div>
    );
}

export default Dashboard;