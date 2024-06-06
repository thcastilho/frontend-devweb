import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Image, Form, Button, Modal } from 'react-bootstrap';
import '../styles/UserData.modules.css';

export default function UserData() {
    const [userData, setUserData] = useState(""); // dados ATUAIS do usuário
    const [editMode, setEditMode] = useState(false); // modo de edição dos dados (verdadeiro ou falso)
    const [formData, setFormData] = useState(""); // formulário PARA ser enviado no PUT
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false); // controle de exibição do pop-up de exclusão de conta

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
                    setUserData(response.data);
                    setFormData(response.data); // inicializa formulário de envio com as infos atuais do usuário
                    setErrorMessage("");
                })
                .catch(error => {
                    console.error('Erro ao buscar informações do usuário', error);
                    setErrorMessage('Erro ao buscar informações do usuário');
                });
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value }); // cria uma cópia superficial do formData para alterar apenas a propriedade requerida
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

    // verifica se a nova senha e a confirmação da senha são iguais
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        setErrorMessage("As novas senhas não coincidem");
        return;
    }

    const updatedFormData = { ...formData };

    // remove campos de senha se estiverem vazios (necessário para funcionamento com o back-end)
    if (!updatedFormData.newPassword) {
        delete updatedFormData.newPassword;
        delete updatedFormData.confirmPassword;
        delete updatedFormData.currentPassword;
    }
    
        if (token) {
            axios.put('http://localhost:8080/usuarios/', updatedFormData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: "json"
            })
            .then(response => {
                setUserData(response.data);
                setSuccessMessage('Informações atualizadas com sucesso');
                setEditMode(false);
            })
            .catch(error => {
                console.error('Erro ao atualizar informações do usuário', error);
                if (error.response) {
                    console.error('Resposta do erro:', error.response);
                    setErrorMessage(`Erro ao atualizar informações do usuário: ${error.response.data.message || error.message}`);
                } else {
                    setErrorMessage('Erro ao atualizar informações do usuário');
                }
            });
        }
    };

    const handleDeleteAccount = () => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.delete('http://localhost:8080/usuarios/', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: "text"
            })
                .then(response => {
                    setSuccessMessage('Conta excluída com sucesso');
                    // Opcional: Redirecionar o usuário ou realizar outras ações após a exclusão
                })
                .catch(error => {
                    console.error('Erro ao excluir a conta do usuário', error);
                    setErrorMessage('Erro ao excluir a conta do usuário');
                });
        }
    };

    const getProfileImageUrl = (gender) => {
        if (gender === "HOMEM") {
            return "https://avatar.iran.liara.run/public/boy";
            // return "https://xsgames.co/randomusers/avatar.php?g=male"
        } else if (gender === "MULHER") {
            return "https://avatar.iran.liara.run/public/girl";
            // return "https://xsgames.co/randomusers/avatar.php?g=female"
        } else {
            return "https://avatar.iran.liara.run/public";
            // return "https://xsgames.co/randomusers/avatar.php?g=pixel"
        }
    }

    const profileImageUrl = getProfileImageUrl(userData.sexo);

    const getSexoText = (sexo) => {
        if (sexo === "HOMEM") {
            return "Homem";
        } else if (sexo === "MULHER") {
            return "Mulher";
        } else {
            return "Não informado";
        }
    }

    return (
        <Container className="user-data-container">
            <Row className="justify-content-md-center">
                <Col md={8}> {/*md serve para justificar o conteúdo do bootstrap, que eh dividido em 12 partes iguais*/}
                    <Card className="user-data-card">
                        <Card.Header className="text-center">
                            <h2>Meus Dados</h2>
                        </Card.Header>
                        <Card.Body>
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            {successMessage && <p className="text-success">{successMessage}</p>}
                            {!editMode ? (
                                <Row>
                                    <Col md={4} className="text-center">
                                        <Image src={profileImageUrl} roundedCircle className="profile-image" />
                                    </Col>
                                    <Col md={8}>
                                        <p><strong>Nome de usuário:</strong> {userData.login}</p>
                                        <p><strong>E-mail:</strong> {userData.email}</p>
                                        {userData.sexo && <p><strong>Sexo:</strong> {getSexoText(userData.sexo)}</p>}
                                        <Button variant="primary" onClick={() => { 
                                            setEditMode(true); 
                                            setFormData({ ...userData, currentPassword: "", newPassword: "", confirmPassword: "" }) // inicializa os respectivos campos sem valor.
                                        }}>Editar Informações</Button>
                                        <Button variant="danger" onClick={() => setShowPopup(true)} className='ms-2'>Excluir Conta</Button>
                                    </Col>
                                </Row>
                            ) : (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group as={Row} controlId="formUsername">
                                        <Form.Label column md={4}>Nome de usuário</Form.Label>
                                        <Col md={8}>
                                            <Form.Control
                                                type="text"
                                                name="login"
                                                value={formData.login}
                                                onChange={handleInputChange}
                                                readOnly /* não pode ser alterado */
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formEmail">
                                        <Form.Label column md={4}>E-mail</Form.Label>
                                        <Col md={8}>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formSexo">
                                        <Form.Label column md={4}>Sexo</Form.Label>
                                        <Col md={8}>
                                            <Form.Control
                                                as="select"
                                                name="sexo"
                                                value={formData.sexo || ""}
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled>Selecione seu gênero</option>
                                                <option value="HOMEM">Homem</option>
                                                <option value="MULHER">Mulher</option>
                                                <option value="NAO_INFORMADO">Prefiro não informar</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formCurrentPassword">
                                        <Form.Label column md={4}>Senha Atual</Form.Label>
                                        <Col md={8}>
                                            <Form.Control
                                                type="password"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formNewPassword">
                                        <Form.Label column md={4}>Nova Senha</Form.Label>
                                        <Col md={8}>
                                            <Form.Control
                                                type="password"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formConfirmPassword">
                                        <Form.Label column md={4}>Confirme a Nova Senha</Form.Label>
                                        <Col md={8}>
                                            <Form.Control
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Button type="submit" variant="success" className='edit-buttons'>Salvar Alterações</Button>
                                    <Button variant="secondary" className='edit-buttons' onClick={() => setEditMode(false)}>Cancelar</Button>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showPopup} onHide={() => setShowPopup(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Exclusão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPopup(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={() => {
                            handleDeleteAccount();
                            setShowPopup(false);
                        }}>
                            Excluir Conta
                        </Button>
                    </Modal.Footer>
            </Modal>
        </Container>
    );
}
