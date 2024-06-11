import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function CriarPost() {
    const [nome, setNome] = useState("");
    const [artist, setArtist] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [categoria, setCategoria] = useState("");
    const [generos, setGeneros] = useState([]);
    const [selectedGeneros, setSelectedGeneros] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        axios.get("http://localhost:8080/generos/")
            .then(response => setGeneros(response.data))
            .catch(error => console.error("Erro ao buscar gêneros. ", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request_body = {
            "nome": nome,
            "artista": artist,
            "dataLancamento": releaseDate,
            "urlImagem": imageUrl,
            "categoria": categoria,
            "generos": selectedGeneros,
        };

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/posts/", request_body, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Erro ao criar post. ", error);
        }
    };

    const handleGenreChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedGeneros([...selectedGeneros, value]);
        } else {
            setSelectedGeneros(selectedGeneros.filter(genre => genre !== value));
        }
    };

    if (!currentUser) return <></>;

    if (currentUser.role !== "ADMIN")
        return (
            <Container>
                <div style={{ textAlign: "center" }}>
                    <h1>Você não possui acesso a este recurso!</h1>
                </div>
            </Container>
        );

    return (
        <Container style={{ paddingTop: "30px" }}>
            <section>
                <Row>
                    <Col>
                        <Card className="w-100">
                            <Card.Body className="p-4">
                                <div>
                                    <h2>Criar novo post</h2>
                                    <Form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="nome">Nome: </Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="nome"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="artist">Artista: </Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="artist"
                                                value={artist}
                                                onChange={(e) => setArtist(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="categoria">Categoria: </Form.Label>
                                            <Form.Select
                                                id="categoria"
                                                value={categoria}
                                                onChange={(e) => setCategoria(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Selecione a categoria...</option>
                                                <option value="MUSICA">Musica</option>
                                                <option value="ALBUM">Album</option>
                                            </Form.Select>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="generos">Gêneros: </Form.Label>
                                            <div className="d-flex flex-wrap">
                                                {generos.map(genre => (
                                                    <div key={genre.id} className="form-check form-check-inline">
                                                        <Form.Check
                                                            type="checkbox"
                                                            id={`genre-${genre.id}`}
                                                            value={genre.id}
                                                            onChange={handleGenreChange}
                                                            label={genre.name}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="releaseDate">Data de lançamento: </Form.Label>
                                            <Form.Control
                                                type="date"
                                                id="releaseDate"
                                                value={releaseDate}
                                                onChange={(e) => setReleaseDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="imageUrl">URL da imagem: </Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="imageUrl"
                                                value={imageUrl}
                                                onChange={(e) => setImageUrl(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <Button type="submit" variant="outline-info">Criar</Button><br />
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
        </Container>
    );
}
