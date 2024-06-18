import React, { useState, useEffect } from 'react';
import '../styles/ExcluirGenero.modules.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { Row, Col, Button, Modal } from 'react-bootstrap';

export default function ExcluirGenero() {
    const [id, setId] = useState("");
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/generos/")
            .then(response =>
                setData(response.data)
            )
            .catch(error =>
                console.error("Erro ao buscar generos. ", error)
            )
    }, [])

    const handleDeleteGenero = () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.delete(`http://localhost:8080/generos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: "text"
            })
                .then(response => {
                    setSuccessMessage('Gênero excluído com sucesso');
                    window.location.reload()  
                })
                .catch(error => {
                    console.error('Erro ao excluir o genero', error);
                    setErrorMessage('Erro ao excluir o genero');
                });
        }

    };

    return (
        <div>
            <h1 className="title-del">Excluir Gênero</h1>
            {errorMessage && <p className="text-danger" style={{textAlign: "center"}}>{errorMessage}</p>}
            {successMessage && <p className="text-success" style={{textAlign: "center"}}>{successMessage}</p>}

            <div className="container">
                <h1 className="sub-title">Gêneros</h1>
                <Row className="music-container">
                    {data.map(item => {
                        return (
                            <div key={item.id}>
                            <Row xs={12} sm={6} md={4} lg={3} className="music-item">
                                <Col md={4} className="text-right">
                                    <p className="music-name">ID: {item.id} -</p>
                                </Col>
                                <Col md={8}>
                                    <Link to={`/genero/${item.id}`} >
                                        <p className="music-name">{item.name}</p>
                                    </Link>
                                </Col>
                                <Col md={12}>
                                    <Button variant="danger" onClick={() => {setId(item.id); setShowPopup(true)}} className='ms-2'>Excluir Gênero</Button>
                                </Col>
                            </Row>
                            </div>
                        );
                    })}
                </Row>
                <p></p>

                <Modal show={showPopup} onHide={() => setShowPopup(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Exclusão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tem certeza de que deseja excluir o gênero? Esta ação é irreversível.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPopup(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={() => {
                            handleDeleteGenero();
                            setShowPopup(false);
                        }}>
                            Excluir Gênero
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

/*

*/