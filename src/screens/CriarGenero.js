import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { MDBRow, MDBCard, MDBCardBody, MDBCol, MDBTypography } from "mdb-react-ui-kit"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom";

export default function CriarGenero() {
    const [nome, setNome] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const request_body = {
            "name": nome,
        }

        try {
            const token = localStorage.getItem('token')

            if (!token) {
                console.error("Token não encontrado")
                setErrorMessage("Token não encontrado")
                setSuccessMessage("")
                return
            }

            await axios.post("http://localhost:8080/generos/", request_body, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setSuccessMessage("Gênero criado com sucesso!")
            setErrorMessage("")
            setNome("")  // Limpa o input após a criação bem-sucedida
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("Um gênero com esse nome já está cadastrado.")
            } else {
                setErrorMessage("Erro ao criar gênero")
            }
            setSuccessMessage("")
            console.error("Erro ao criar gênero: ", error)
        }
    }

    const handleInputChange = (e) => {
        setNome(e.target.value)
        setErrorMessage("")
        setSuccessMessage("")
    }

    const handleBackClick = () => {
        navigate("/admin-panel")
    }

    if (!currentUser) return <></>

    if (currentUser.role !== "ADMIN")
        return (
            <Container>
                <div style={{ textAlign: "center" }}>
                    <h1>Você não possui acesso a este recurso!</h1>
                </div>
            </Container>
        )

    return (
        <Container style={{ paddingTop: "30px" }}>
            <section>
                <MDBRow>
                    <MDBCol>
                        <MDBCard className="w-100">
                            <MDBCardBody className="p-4">
                                <MDBTypography tag="h2">Criar novo gênero</MDBTypography>
                                {errorMessage && <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>}
                                {successMessage && <p style={{ textAlign: "center", color: "green" }}>{successMessage}</p>}
                                <Form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome: </label>
                                        <input
                                            type="text"
                                            id="nome"
                                            value={nome}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control form-border"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Button variant="outline-secondary" onClick={handleBackClick}>Voltar</Button>
                                        <Button type="submit" variant="outline-info">Criar</Button>
                                    </div>
                                </Form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </section>
        </Container>
    )
}