import React, {useEffect } from "react";
import {useNavigate } from "react-router-dom";


const PrivateRoutes = ({ Component }: { Component: React.FC }): JSX.Element => {
    
    const navigate = useNavigate();

    useEffect(() => {
        let login = localStorage.getItem("userId");
        if (!login) navigate("/login"); 
    })

    return (
        <Component />
    );
};


export default PrivateRoutes;