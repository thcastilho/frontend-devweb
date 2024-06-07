import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap"
import data from "../data/post-data.json"
import avaliacoes from "../data/avaliacoes-data.json"
import "../styles/MusicDetails.modules.css"
import { Rating } from "@mui/material";
import Avaliacoes from "../components/Avaliacoes";
import { useAuth } from "../contexts/AuthContext";
import ReviewForm from "../components/ReviewForm";

export default function MusicDetails() {
    const { id } = useParams()
    const item = data.find(item => item.id === parseInt(id));
    const [showForm, setShowForm] = useState(false);
    const [reviews, setReviews] = useState(avaliacoes)
    const [profileImageUrl, setProfileImageUrl] = useState("")
    const { currentUser } = useAuth();
    const navigate = useNavigate();

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

    if (!item) {
        return <div>Music not found</div>;
    }

    const handleReviewClick = () => {
        if (currentUser) {
            setShowForm(true);
        } else {
            navigate("/login");
        }
    };

    const handleNewReview = (newReview) => {
        setReviews(prevReviews => [...prevReviews, newReview])
        setShowForm(false);
    };

    return (
        <>
            <Container>
                <div className="post-review">
                    <img src={item.image} alt="Music cover" />
                    <div className="post-description">
                        <p className="post-title">{item.name}</p>
                        <span className="topic">Artista</span>
                        <p>{item.artist}</p>
                        <span className="topic">Categoria</span>
                        {item.categoria === 0 ? <p>Single</p> : <p>Álbum</p>}
                        <span className="topic">Data de lançamento</span>
                        <p>{item.lancamento}</p>
                        <span className="topic">Generos</span>
                        <p>{item.generos}</p>
                        <span className="topic">Avaliação média</span>
                        <p>
                            <Rating
                                value={item.avgStars}
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
                    <p className="avaliacoes-title" style={{ paddingTop: "16px" }}>Avaliações</p>
                </div>
                <Avaliacoes avaliacoes={reviews} />
            </Container>
        </>
    )
}