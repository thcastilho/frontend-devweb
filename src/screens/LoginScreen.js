import axios from "axios";
import React, { useState } from "react";
import "../styles/Login.modules.css"
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate()
    const { setCurrentUser } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const request_body = {
            "login": username,
            "password": password
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/login", request_body);
            const { token } = response.data;
            localStorage.setItem("token", token);

            const userResponse = await axios.get("http://localhost:8080/usuarios/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCurrentUser(userResponse.data)

            setSuccessMessage("Login realizado com sucesso!")
            setErrorMessage("")
            navigate("/")
        } catch (error) {
            console.error("Erro: ", error);
            setErrorMessage("Invalid username or password");
            setSuccessMessage("")
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="login-txt">Login</h1>
                {errorMessage ? <p style={{textAlign: "center"}}>{errorMessage}</p> : ""}
                {successMessage && <p style={{textAlign: "center"}}>{successMessage}</p>}
                <Form onSubmit={handleSubmit} className="form-login">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-control form-border"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control form-border"
                        />
                    </div>
                    <div className="login-ft">
                        <button type="submit" className="btn btn-outline-info">Entrar</button><br />
                        <span>Não possui uma conta? </span>
                        <Link to="/registrar"><span className="register-txt">Registre-se agora!</span></Link>
                    </div>
                </Form>
            </div>
        </>
    );
}