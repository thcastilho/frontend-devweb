import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const MakeLogout = () => {
        localStorage.clear();
        console.log("Logout realizado com sucesso!")
        navigate("/")
    }

    return(
        <div>
            <MakeLogout />
        </div>
    );
}