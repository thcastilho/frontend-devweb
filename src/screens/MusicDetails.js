import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap"
import data from "../data/post-data.json"
import avaliacoes from "../data/avaliacoes-data.json"
import "../styles/MusicDetails.modules.css"
import { Rating } from "@mui/material";
import Avaliacoes from "../components/Avaliacoes";

export default function MusicDetails() {
    const { id } = useParams()
    const item = data.find(item => item.id === parseInt(id));

    if (!item) {
        return <div>Music not found</div>;
    }

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
                    <p className="avaliacoes-title">Avaliações</p>
                </div>
                <Avaliacoes avaliacoes={avaliacoes} />
            </Container>
        </>
    )
}