import React, { useState, useEffect } from 'react';
import '../styles/ExcluirPost.modules.css'
import { Rating } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Row, Col, Button, Modal } from 'react-bootstrap';

export default function ExcluirPost() {
    const [id, setId] = useState("");
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8080/posts/")
            .then(response =>
                setData(response.data)
            )
            .catch(error =>
                console.error("Erro ao buscar posts. ", error)
            )
    }, [])

    const singles = data.filter(item => item.categoria === "MUSICA")
    const albuns = data.filter(item => item.categoria === "ALBUM")

    const handleDeletePost = () => {
        const token = localStorage.getItem('token');

        console.log(id);

        if (token) {
            axios.delete(`http://localhost:8080/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: "text"
            })
                .then(response => {
                    setSuccessMessage('Post excluído com sucesso');
                    navigate("/excluir-post");
                })
                .catch(error => {
                    console.error('Erro ao excluir o post', error);
                    setErrorMessage('Erro ao excluir o post');
                });
        }

        console.log("chegou aki");
    };

    return (
        <>
            <h1 className="title">Excluir Post</h1>
            {errorMessage && <p className="text-danger" style={{textAlign: "center"}}>{errorMessage}</p>}
            {successMessage && <p className="text-success" style={{textAlign: "center"}}>{successMessage}</p>}

            <div className="container">
                <h1 className="sub-title">Músicas</h1>
                <Row className="music-container">
                    {singles.map(item => {
                        console.log(`Single: ${item.name}, averageRating: ${item.averageRating}`);
                        return (
                            <div>
                            <Row key={item.id} xs={12} sm={6} md={4} lg={3} className="music-item">
                                <Col md={4} className="text-right">
                                    <img src={item.image} alt={item.name} />
                                </Col>
                                <Col md={8}>
                                    <Link to={`/post/${item.id}`} >
                                        <p className="music-name">{item.name}</p>
                                    </Link>
                                    <p>{item.artist}</p>
                                    <Rating
                                        value={item.averageRating}
                                        precision={0.5}
                                        readOnly
                                        max={5}
                                    />
                                </Col>
                                <Col md={12}>
                                    <Button variant="danger" onClick={() => {setId(item.id); setShowPopup(true)}} className='ms-2'>Excluir Post</Button>
                                </Col>
                            </Row>
                            </div>
                        );
                    })}
                </Row>

                <h1 className="sub-title">Álbuns</h1>
                <Row className="music-container">
                    {albuns.map(item => (
                        <div>
                        <Row key={item.id} xs={12} sm={6} md={4} lg={3} className="music-item">
                            <Col md={4} className="text-right">
                                <img src={item.image} alt={item.name} />
                            </Col>
                            <Col md={8} className="text-left">
                                <Link to={`/post/${item.id}`} >
                                    <p className="music-name">{item.name}</p>
                                </Link>
                                <p>{item.artist}</p>
                                <Rating
                                    value={item.averageRating}
                                    precision={0.5}
                                    readOnly
                                    max={5}
                                />
                            </Col>
                            <Col md={12}>
                                <Button variant="danger" onClick={() => {setId(item.id); setShowPopup(true)}} className='ms-2'>Excluir Post</Button>
                            </Col>
                        </Row>
                        </div>
                    ))}
                </Row>
                <p></p>

                <Modal show={showPopup} onHide={() => setShowPopup(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Exclusão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tem certeza de que deseja excluir o post? Esta ação é irreversível.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPopup(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={() => {
                            handleDeletePost();
                            setShowPopup(false);
                        }}>
                            Excluir Post
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

/*

*/