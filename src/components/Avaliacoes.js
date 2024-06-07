import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Rating } from '@mui/material';
import Resposta from './Resposta';
import axios from 'axios';

const Avaliacoes = ({ avaliacoes }) => {
    const [userData, setUserData] = useState("")
    const [showReplyBox, setShowReplyBox] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [respostas, setRespostas] = useState({});
    const [errorMessage, setErrorMessage] = useState()

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


    const handleReplyClick = (itemId) => {
        setShowReplyBox(itemId);
    };

    const handleReplySubmit = (itemId) => {
        if (replyText.trim() !== '') {
            const newReply = {
                user: userData.login,
                text: replyText,
                date: new Date().toLocaleDateString(),
                fotoPerfil: profileImageUrl
            };

            setRespostas(prevState => ({
                ...prevState,
                [itemId]: [...(prevState[itemId] || []), newReply]
            }));
            setReplyText('');
            setShowReplyBox(null);
        }
    };

    return (
        <section>
            <MDBRow>
                <MDBCol>
                    {avaliacoes.map(item => (
                        <div key={item.id} className="d-flex flex-start mb-4">
                            <img
                                className="rounded-circle shadow-1-strong me-3"
                                src={item.fotoPerfil}
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <MDBCard className="w-100">
                                <MDBCardBody className="p-4">
                                    <div>
                                        <MDBTypography tag="h5">{item.user}</MDBTypography>
                                        <Rating
                                            value={item.numStars}
                                            precision={0.5}
                                            readOnly
                                            max={5}
                                        />
                                        <p className="small">{item.publishDate}</p>
                                        <p>{item.text}</p>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex align-items-center" style={{ gap: "5px" }}>
                                                <a href="#!" className="link-muted me-2">
                                                    <MDBIcon fas icon="thumbs-up me-1" />
                                                    {item.numLikes}
                                                </a>
                                                <a href="#!" className="link-muted me-2">
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
                                                user={resposta.user}
                                                text={resposta.text}
                                                date={resposta.date}
                                                fotoPerfil={resposta.fotoPerfil}
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
