import {
    Vote,
    FolderOpen,
    UserRound,
    Settings,
    X
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

function DashboardSidebar({ isOpen, onClose }) {
    return (
        <>
            {/* Mobile/Tablet Background Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    w-64 h-screen
                    bg-slate-950 text-white
                    flex flex-col p-6
                    overflow-y-auto overscroll-contain

                    transform transition-transform duration-300 ease-in-out

                    ${isOpen ? "translate-x-0" : "-translate-x-full"}

                    lg:sticky lg:top-0 lg:translate-x-0
                    lg:shrink-0
                `}
            >

                {/* Mobile Close Button */}
                <div className="flex justify-end mb-4 lg:hidden">

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close navigation menu"
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Navigation */}
                <nav className="space-y-2">

                    {navigationItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={onClose}
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
        </>
    );
}

export default DashboardSidebar;