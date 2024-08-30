/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RouteGuard = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("authUser");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/startPage/StartPage");
        } else {
            navigate("/dashboard/Home");
        }
    }, [isAuthenticated, navigate]);

    return <>{children}</>;
};

export default RouteGuard;
