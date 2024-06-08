import React, { useState } from "react"
import { Container, Form } from "react-bootstrap"
import { MDBRow, MDBCard, MDBCardBody, MDBCol, MDBTypography } from "mdb-react-ui-kit"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"

export default function CriarGenero() {
    const [nome, setNome] = useState("")
    const { currentUser } = useAuth()

    const handleSubmit = async () => {
        const request_body = {
            "name": nome,
        }

        try {
            const token = localStorage.getItem("token")
            await axios.post("http://localhost:8080/generos/", request_body, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error) {
            console.error("Erro ao criar genero. ", error)
        }
    }
    
    if(!currentUser) return<></>

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
                                <div>
                                    <MDBTypography tag="h2">Criar novo gênero</MDBTypography>
                                    <Form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="nome" className="form-label">Nome: </label>
                                            <input
                                                type="text"
                                                id="nome"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                required
                                                className="form-control form-border"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-outline-info">Criar</button><br />
                                    </Form>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </section>
        </Container>
    )
}