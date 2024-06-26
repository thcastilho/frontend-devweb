import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Rating } from '@mui/material';
import Resposta from './Resposta';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, parse } from 'date-fns';

const Avaliacoes = ({ avaliacoes }) => {
    const [reviews, setReviews] = useState(avaliacoes)
    const [showReplyBox, setShowReplyBox] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [respostas, setRespostas] = useState({});
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [usuarios, setUsuarios] = useState({});

    useEffect(() => {
        const fetchRespostas = async () => {
            try {
                const respostasData = await Promise.all(
                    reviews.map(async (item) => {
                        const response = await axios.get(`http://localhost:8080/comentarios/${item.id}/respostas`);
                        return { [item.id]: response.data };
                    })
                );
                const respostasObj = respostasData.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                setRespostas(respostasObj);
            } catch (error) {
                console.error("Erro ao carregar respostas: ", error);
            }
        };

        fetchRespostas();
    }, [reviews]);

    const fetchUsuarioData = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8080/usuarios/login/${username}`);
            const userData = response.data;
            const profileImageUrl = getProfileImageUrl(userData.sexo);
            return { ...userData, profileImageUrl };
        } catch (error) {
            console.error(`Erro ao carregar dados do usuário com ID ${username}: `, error);
            return null;
        }
    };
    
    useEffect(() => {
        const fetchUsuarios = async () => {
            const usuariosData = await Promise.all(
                reviews.map(async (item) => {
                    const usuarioData = await fetchUsuarioData(item.criadoPor);
                    return { [item.criadoPor]: usuarioData };
                })
            );
            const usuariosObj = usuariosData.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            setUsuarios(usuariosObj);
        };
    
        fetchUsuarios();
    }, [reviews]);
    

    const getProfileImageUrl = (gender) => {
        const cacheBuster = new Date().getTime();
        if (gender === "HOMEM") {
            return `https://avatar.iran.liara.run/public/boy?cb=${cacheBuster}`;
        } else if (gender === "MULHER") {
            return `https://avatar.iran.liara.run/public/girl?cb=${cacheBuster}`;
        } else {
            return `https://avatar.iran.liara.run/public?cb=${cacheBuster}`;
        }
    };
    

    const formatDate = (dateString) => {
        try {
            const parsedDate = parse(dateString, 'dd/MM/yyyy HH:mm', new Date());
            if (isNaN(parsedDate)) {
                throw new Error("Invalid date");
            }
            return format(parsedDate, 'dd/MM/yyyy HH:mm');
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Data inválida";
        }
    };
    

    const handleReplyClick = (itemId) => {
        if (currentUser) {
            setShowReplyBox(itemId);
        } else {
            navigate("/login")
        }
    };


    const handleReplySubmit = async (itemId) => {
        if (replyText.trim() !== '') {
            const newReply = {
                text: replyText,
            };

            try {
                const token = localStorage.getItem("token")
                const response = await axios.post(`http://localhost:8080/comentarios/resposta/${itemId}`, newReply, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const savedReply = response.data

                setRespostas(prevState => ({
                    ...prevState,
                    [itemId]: [...(prevState[itemId] || []), savedReply]
                }));
                setReplyText('');
                setShowReplyBox(null);
            } catch (error) {
                console.error("Erro ao enviar resposta. ", error)
            }

        }
    };

    const handleLikeClick = async (itemId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`http://localhost:8080/usuarios/like/${itemId}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const updatedAvaliacao = response.data;

            setReviews(prevAvaliacoes => prevAvaliacoes.map(item =>
                item.id === itemId ? { ...item, numLikes: updatedAvaliacao.numLikes, numDislikes: updatedAvaliacao.numDislikes } : item
            ));
        } catch (error) {
            console.error("Erro ao dar like: ", error);
        }
    };

    const handleDislikeClick = async (itemId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`http://localhost:8080/usuarios/dislike/${itemId}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const updatedAvaliacao = response.data;

            setReviews(prevAvaliacoes => prevAvaliacoes.map(item =>
                item.id === itemId ? { ...item, numDislikes: updatedAvaliacao.numDislikes, numLikes: updatedAvaliacao.numLikes } : item
            ));
        } catch (error) {
            console.error("Erro ao dar dislike: ", error);
        }
    };

    return (
        <section>
            <MDBRow>
                <MDBCol>
                    {reviews.map(item => (
                        <div key={item.id} className="d-flex flex-start mb-4">
                            <img
                                className="rounded-circle shadow-1-strong me-3"
                                src={usuarios[item.criadoPor]?.profileImageUrl}
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <MDBCard className="w-100">
                                <MDBCardBody className="p-4">
                                    <div>
                                        <MDBTypography tag="h5">{item.criadoPor}</MDBTypography>
                                        <Rating
                                            value={item.numStars}
                                            precision={0.5}
                                            readOnly
                                            max={5}
                                        />
                                        <p className="small">{formatDate(item.dataCriacao)}</p>
                                        <p>{item.text}</p>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex align-items-center" style={{ gap: "5px" }}>
                                                <a href="#!" className="link-muted me-2" onClick={() => handleLikeClick(item.id)}>
                                                    <MDBIcon fas icon="thumbs-up me-1" />
                                                    {item.numLikes}
                                                </a>
                                                <a href="#!" className="link-muted me-2" onClick={() => handleDislikeClick(item.id)}>
                                                    <MDBIcon fas icon="thumbs-down me-2" />
                                                    {item.numDislikes}
                                                </a>
                                                <a href="#!" className="link-muted me-3" onClick={() => handleReplyClick(item.id)}>
                                                    <MDBIcon fas icon="comment me-1" />Responder
                                                </a>
                                            </div>
                                        </div>
                                        {showReplyBox === item.id && (
                                            <div className="mt-3">
                                                <textarea
                                                    className="form-control"
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    rows="3"
                                                ></textarea>
                                                <button className="btn btn-primary mt-2" onClick={() => handleReplySubmit(item.id)}>
                                                    Enviar
                                                </button>
                                            </div>
                                        )}
                                        {respostas[item.id] && respostas[item.id].map((resposta, index) => (
                                            <Resposta
                                                key={index}
                                                user={resposta.criadoPor}
                                                text={resposta.text}
                                                date={resposta.dataCriacao}
                                                fotoPerfil={resposta.fotoPerfil}
                                                idResposta={resposta.id}
                                                currNumLikes={resposta.numLikes}
                                                currNumDislikes={resposta.numDislikes}
                                            />
                                        ))}
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    ))}
                </MDBCol>
            </MDBRow>
        </section>
    );
};

export default Avaliacoes;
