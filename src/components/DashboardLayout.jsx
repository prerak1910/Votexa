import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

function DashboardLayout() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

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

            } catch (error) {
                sessionStorage.removeItem("access_token");
                sessionStorage.removeItem("user");
                setAuthenticated(false);

            } finally {
                setLoading(false);
            }
        }

        verifyProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                    Verifying your session...
                </p>
            </div>
        );
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen bg-gray-50">

            <DashboardSidebar />

            <div className="flex-1 min-w-0">

                <DashboardNavbar />

                <main className="p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default DashboardLayout;