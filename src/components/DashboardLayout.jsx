import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

function DashboardLayout() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // 1. Verify user authentication
    useEffect(() => {
        async function verifyProfile() {
            const token = sessionStorage.getItem("access_token");

            if (!token) {
                setAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    "http://127.0.0.1:5000/api/profile",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Session expired.");
                }

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                setAuthenticated(true);

            } catch {
                sessionStorage.removeItem("access_token");
                sessionStorage.removeItem("user");
                setAuthenticated(false);

            } finally {
                setLoading(false);
            }
        }

        verifyProfile();
    }, []);

    // 2. Prevent background scrolling when sidebar is open
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    // 3. Loading screen
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                    Verifying your session...
                </p>
            </div>
        );
    }

    // 4. Redirect unauthenticated users
    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    // 5. Dashboard layout with independent scrolling
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">

            <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">

                <DashboardNavbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default DashboardLayout;