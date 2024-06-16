import React, { useState, useEffect } from 'react';
import '../styles/Home.modules.css'
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

export default function Home() {
    const [data, setData] = useState([])

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

    return (
        <>
            <div className="container">
                <h1 className="title">Novas músicas</h1>
                <Row className="music-container">
                    {singles.map(item => {
                        console.log(`Single: ${item.name}, averageRating: ${item.averageRating}`);
                        return (
                            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="music-item">
                                <img src={item.image} alt={item.name} />
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
                        );
                    })}
                </Row>

                <h1 className="title">Novos álbuns</h1>
                <Row className="music-container">
                    {albuns.map(item => (
                        <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="music-item">
                            <img src={item.image} alt={item.name} />
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
                    ))}
                </Row>
                <p></p>
            </div>
        </>
    );
}