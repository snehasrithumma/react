// ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/authContext'; // Update path to your AuthContext

const ProtectedRoute = ({ element }) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render the protected component if logged in
    return element;
};

export default ProtectedRoute;
