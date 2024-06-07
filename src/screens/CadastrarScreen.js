import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import "../styles/Register.modules.css"
import { Link } from "react-router-dom";

export default function CadastrarScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        const genderValue = gender === "Homem" ? "HOMEM" : gender === "Mulher" ? "MULHER" : "NAO_INFORMADO";

        const request_body = {
            "login": username,
            "email": email,
            "password": password,
            "sexo": genderValue,
            "role": "USER"
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/register", request_body);
            console.log("Cadastro realizado com sucesso! ", response.data);
            setSuccessMessage("Cadastro realizado com sucesso!")
            setErrorMessage("")
        } catch (error) {
            console.error("Error:", error);
            setSuccessMessage("")
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="registrar-txt">Registrar</h1>
                {errorMessage ? <p style={{textAlign: "center"}}>{errorMessage}</p> : ""}
                {successMessage && <p style={{textAlign: "center"}}>{successMessage}</p>}
                <Form onSubmit={handleSubmit} className="form-register">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username: </label>
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
                        <label htmlFor="email" className="form-label">E-mail: </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control form-border"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Gênero: </label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                            className="form-control form-border"
                        >
                            <option value="" disabled>Selecione seu gênero</option>
                            <option value="Homem">Homem</option>
                            <option value="Mulher">Mulher</option>
                            <option value="Prefiro não informar">Prefiro não informar</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha: </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control form-border"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar senha: </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="form-control form-border"
                        />
                    </div>
                    <div className="registrar-ft">
                        <button type="submit" className="btn btn-outline-info">Sign Up</button><br />
                        <p>
                            Já possui uma conta? 
                            <Link to="/login"><span className="entrar-txt"> Entrar</span></Link>
                        </p>
                    </div>
                </Form>
            </div>
        </>
    );
}