import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext"; // <-- Add this import statement

// Public Pages
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import Properties from "./pages/Properties";
import MyBookings from "./pages/MyBookings";

// Owner Pages
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddProperty from "./pages/owner/AddProperty";
import ManageProperties from "./pages/owner/ManageProperties";
import ManageBookings from "./pages/owner/ManageBookings";

// Components
import Login from "./components/Login";

const App = () => {
    // Now useAppContext is defined, and you can safely destructure showLogin from it.
    const { showLogin } = useAppContext();
    const location = useLocation();
    const isOwnerPath = location.pathname.startsWith("/owner");

    return (
        <>
            <Toaster />
            {showLogin && <Login />}

            {!isOwnerPath && <Navbar />}

            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/property-details/:id" element={<PropertyDetails />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/my-bookings" element={<MyBookings />} />

                {/* Owner Routes */}
                <Route path="/owner" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="add-property" element={<AddProperty />} />
                    <Route path="manage-properties" element={<ManageProperties />} />
                    <Route path="manage-bookings" element={<ManageBookings />} />
                </Route>
            </Routes>

            {!isOwnerPath && <Footer />}
        </>
    );
};

export default App;