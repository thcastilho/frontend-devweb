import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Rating } from "@mui/material";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

const ReviewForm = ({ onNewReview }) => {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const { currentUser } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        onNewReview({
            text,
            numStars: rating,
            publishDate: new Date().toLocaleDateString(),
            // fotoPerfil: profileImageUrl
        });
        setText("");
        setRating(0);
    };

    if (!currentUser) return null;

    return (
        <MDBCard className="w-100">
            <MDBCardBody className="p-4">
                <form onSubmit={handleSubmit}>
                    <div>
                        <Rating
                            precision={0.5}
                            max={5}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <textarea
                            className="form-control"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={3}
                            required
                        />
                        <button className="btn btn-primary mt-2" type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
            </MDBCardBody>
        </MDBCard>
    );
};

export default ReviewForm;
