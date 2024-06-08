import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap"
import "../styles/MusicDetails.modules.css"
import { Rating } from "@mui/material";
import Avaliacoes from "../components/Avaliacoes";
import { useAuth } from "../contexts/AuthContext";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";

export default function MusicDetails() {
    const { id } = useParams()
    const [showForm, setShowForm] = useState(false);
    const [reviews, setReviews] = useState([])
    const [profileImageUrl, setProfileImageUrl] = useState("")
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/posts/${id}`)
            .then(response =>
                setData(response.data)
            )
            .catch(error =>
                console.error("Erro ao buscar post. ", error)
            )

        axios.get(`http://localhost:8080/comentarios/${id}/avaliacoes`)
            .then(response =>
                setReviews(response.data)
            )
            .catch(error =>
                console.error("Erro ao buscar avaliações. ", error)
            )
    }, [id])

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

    useEffect(() => {
        if (currentUser) {
            setProfileImageUrl(getProfileImageUrl(currentUser.sexo))
        }
    }, [currentUser])

    if (!data) {
        return <div>Music not found</div>;
    }

    const handleReviewClick = () => {
        if (currentUser) {
            setShowForm(true);
        } else {
            navigate("/login");
        }
    };

    const handleNewReview = async (newReview) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.post(`http://localhost:8080/comentarios/avaliacao/${id}`, newReview, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const savedReview = response.data

            setReviews(prevReviews => [...prevReviews, savedReview])
            setShowForm(false);
        } catch (error) {
            console.error("Erro ao fazer avaliação. ", error)
        }

    };

    return (
        <>
            <Container>
                <div className="post-review">
                    <img src={data.image} alt="Music cover" />
                    <div className="post-description">
                        <p className="post-title">{data.name}</p>
                        <span className="topic">Artista</span>
                        <p>{data.artist}</p>
                        <span className="topic">Categoria</span>
                        {data.categoria === "MUSICA" ? <p>Single</p> : <p>Álbum</p>}
                        <span className="topic">Data de lançamento</span>
                        <p>{data.lancamento}</p>
                        <span className="topic">Generos</span>
                        <p>{data.generos}</p>
                        <span className="topic">Avaliação média</span>
                        <p>
                            <Rating
                                value={data.avgStars}
                                precision={0.5}
                                readOnly
                                max={5}
                            />
                        </p>
                    </div>
                </div>
                <div className="avaliacoes">
                    <button className="avaliacoes-title btn-review" onClick={handleReviewClick}>
                        Faça uma avaliação
                    </button>
                    {showForm && <ReviewForm onNewReview={handleNewReview} profileImageUrl={profileImageUrl} />}
                    <p className="avaliacoes-title" style={{ paddingTop: "16px" }}>{reviews.length} Avaliações</p>
                </div>
                <Avaliacoes avaliacoes={reviews} />
            </Container>
        </>
    )
}