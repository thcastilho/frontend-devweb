import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import '../styles/UserData.modules.css';

export default function UserData() {
    const [userData, setUserData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('http://localhost:8080/usuarios/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: "json"
            })
                .then(response => {
                    console.log('Dados do usuário:', response.data); // Adicione este log
                    setUserData(response.data);
                    setErrorMessage("");
                })
                .catch(error => {
                    console.error('Erro ao buscar informações do usuário', error);
                    setErrorMessage('Erro ao buscar informações do usuário');
                });
        }
    }, []);

    const getProfileImageUrl = (gender) => {
        if (gender === "HOMEM") {
            return "https://avatar.iran.liara.run/public/boy";
        } else if (gender === "MULHER") {
            return "https://avatar.iran.liara.run/public/girl";
        } else {
            return "https://avatar.iran.liara.run/public";
        }
    }

    const profileImageUrl = getProfileImageUrl(userData.sexo);

    return (
        <Container className="user-data-container">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="user-data-card">
                        <Card.Header className="text-center">
                            <h2>Informações do Usuário</h2>
                        </Card.Header>
                        <Card.Body>
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            {!errorMessage && (
                                <Row>
                                    <Col md={4} className="text-center">
                                        <Image src={profileImageUrl} roundedCircle className="profile-image" />
                                    </Col>
                                    <Col md={8}>
                                        <p><strong>Username:</strong> {userData.login}</p>
                                        <p><strong>E-mail:</strong> {userData.email}</p>
                                        {userData.sexo && <p><strong>Sexo:</strong> {userData.sexo}</p>}
                                    </Col>
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
