import React, { useState } from "react"
import { Rating } from "@mui/material";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import Resposta from "../components/Resposta";

const Avaliacoes = ({ avaliacoes }) => {
    const [showReplyBox, setShowReplyBox] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [respostas, setRespostas] = useState({});

    const handleReplyClick = (itemId) => {
        setShowReplyBox(itemId);
    };

    const handleReplySubmit = (itemId) => {
        if (replyText.trim() !== '') {
            setRespostas(prevState => ({
                ...prevState,
                [itemId]: [...(prevState[itemId] || []), replyText]
            }));
            setReplyText('');
            setShowReplyBox(null);
        }
    };

    return (
        <>
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
                                            <p>
                                                {item.text}
                                            </p>

                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex align-items-center">
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
                                                <Resposta key={index} text={resposta} />
                                            ))}
                                        </div>
                                        <Resposta />
                                    </MDBCardBody>
                                </MDBCard>
                            </div>
                        ))}
                    </MDBCol>
                </MDBRow>
            </section>
        </>
    )
}

export default Avaliacoes