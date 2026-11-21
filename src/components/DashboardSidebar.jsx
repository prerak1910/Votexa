import {
    Vote,
    FolderOpen,
    UserRound,
    Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigationItems = [
    {
        name: "All Elections",
        icon: Vote,
        path: "/elections",
    },
    {
        name: "My Elections",
        icon: FolderOpen,
        path: "/my-elections",
    },
    {
        name: "Profile",
        icon: UserRound,
        path: "/profile",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings",
    },
];

function DashboardSidebar() {
    return (
        <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col p-6">

            {/* Navigation */}
            <nav className="space-y-2">

                {navigationItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                                ${
                                    isActive
                                        ? "bg-slate-800 text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`
                            }
                        >
                            <Icon size={20} />

                            <span className="font-medium">
                                {item.name}
                            </span>
                        </NavLink>
                    );
                })}

            </nav>
        </aside>
    );
}

export default DashboardSidebar;