import React, { useEffect, useState } from "react";
import { MDBCardBody, MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import { format } from "date-fns";

const Resposta = ({ user, text, date, idResposta, currNumLikes, currNumDislikes }) => {
    const [numLikes, setNumLikes] = useState(currNumLikes);
    const [numDislikes, setNumDislikes] = useState(currNumDislikes);
    const [fotoPerfil, setFotoPerfil] = useState("");

    useEffect(() => {
        const fetchUsuarioData = async (username) => {
            try {
                const response = await axios.get(`http://localhost:8080/usuarios/login/${username}`);
                const userData = response.data;
                const profileImageUrl = getProfileImageUrl(userData.sexo);
                setFotoPerfil(profileImageUrl);
            } catch (error) {
                console.error(`Erro ao carregar dados do usuário com ID ${username}: `, error);
            }
        };

        fetchUsuarioData(user);
    }, [user]);

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

    if (!text) return null;

    const handleLikeClick = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`http://localhost:8080/usuarios/like/${idResposta}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNumLikes(response.data.numLikes);
            setNumDislikes(response.data.numDislikes);
        } catch (error) {
            console.error("Erro ao dar like na resposta: ", error);
        }
    };

    const handleDislikeClick = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`http://localhost:8080/usuarios/dislike/${idResposta}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNumDislikes(response.data.numDislikes);
            setNumLikes(response.data.numLikes);
        } catch (error) {
            console.error("Erro ao dar dislike na resposta: ", error);
        }
    };

    const formatDate = (dateString) => {
        const parsedDate = new Date(dateString);
        return format(parsedDate, 'dd/MM/yyyy HH:mm');
    };

    return (
        <>
            <MDBCardBody>
                <div>
                    <img
                        className="rounded-circle shadow-1-strong me-3"
                        src={fotoPerfil}
                        alt="avatar"
                        width="65"
                        height="65"
                    />

                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                                {user}
                                <span className="small"> - {formatDate(date)}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                {text}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <a href="#!" className="link-muted me-2" onClick={() => handleLikeClick()}>
                                    <MDBIcon fas icon="thumbs-up me-1" />
                                    {numLikes}
                                </a>
                                <a href="#!" className="link-muted" onClick={() => handleDislikeClick()}>
                                    <MDBIcon fas icon="thumbs-down me-1" />
                                    {numDislikes}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </MDBCardBody>
        </>
    )
}

export default Resposta