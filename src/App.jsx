import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardLayout from "./components/DashboardLayout";
import AllElections from "./pages/AllElections";
import MyElections from "./pages/MyElections";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* Protected Dashboard Routes */}
            <Route element={<DashboardLayout />}>

                <Route
                    path="/elections"
                    element={<AllElections />}
                />

                <Route
                    path="/my-elections"
                    element={<MyElections />}
                />
                <Route
                    path="/profile"
                    element={<Profile />}
                />
                <Route
                    path="/settings"
                    element={<Settings />}
                />

            </Route>

            {/* Fallback */}
            <Route
                path="*"
                element={<Navigate to="/elections" replace />}
            />

        </Routes>
    );
}

export default App;