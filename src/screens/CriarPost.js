import React, { useState, useEffect } from "react"
import { Container, Form } from "react-bootstrap"
import { MDBRow, MDBCard, MDBCardBody, MDBCol, MDBTypography } from "mdb-react-ui-kit"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"

export default function CriarPost() {
    const [nome, setNome] = useState("")
    const [artist, setArtist] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [categoria, setCategoria] = useState("")
    const [generos, setGeneros] = useState([])
    const [selectedGeneros, setSelectedGeneros] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        axios.get("http://localhost:8080/generos/")
            .then(response => setGeneros(response.data))
            .catch(error => console.error("Erro ao buscar gêneros. ", error))
    }, [])

    const handleSubmit = async () => {
        const request_body = {
            "nome": nome,
            "artista": artist,
            "dataLancamento": releaseDate,
            "urlImagem": imageUrl,
            "categoria": categoria,
            "generos": selectedGeneros,
        }

        try {
            const token = localStorage.getItem("token")
            await axios.post("http://localhost:8080/posts/", request_body, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error) {
            console.error("Erro ao criar post. ", error)
        }
    }

    const handleGenreChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedGeneros([...selectedGeneros, value]);
        } else {
            setSelectedGeneros(selectedGeneros.filter(genre => genre !== value));
        }
    };

    if (!currentUser) return <></>

    if (currentUser.role !== "ADMIN")
        return (
            <Container>
                <div style={{ textAlign: "center" }}>
                    <h1>Você não possui acesso a este recurso!</h1>
                </div>
            </Container>
        )


    return (
        <Container style={{ paddingTop: "30px" }}>
            <section>
                <MDBRow>
                    <MDBCol>
                        <MDBCard className="w-100">
                            <MDBCardBody className="p-4">
                                <div>
                                    <MDBTypography tag="h2">Criar novo post</MDBTypography>
                                    <Form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="nome" className="form-label">Nome: </label>
                                            <input
                                                type="text"
                                                id="nome"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                required
                                                className="form-control form-border"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="artist" className="form-label">Artista: </label>
                                            <input
                                                type="text"
                                                id="artist"
                                                value={artist}
                                                onChange={(e) => setArtist(e.target.value)}
                                                required
                                                className="form-control form-border"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="categoria" className="form-label">Categoria: </label>
                                            <select
                                                id="categoria"
                                                value={categoria}
                                                onChange={(e) => setCategoria(e.target.value)}
                                                required
                                                className="form-control form-border"
                                            >
                                                <option value="" disabled>Selecione a categoria...</option>
                                                <option value="MUSICA">Musica</option>
                                                <option value="ALBUM">Album</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="generos" className="form-label">Gêneros: </label>
                                            {generos.map(genre => (
                                                <div key={genre.id}>
                                                    <input
                                                        type="checkbox"
                                                        value={genre.id}
                                                        onChange={handleGenreChange}
                                                    />
                                                    <label> {genre.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="releaseDate" className="form-label">Data de lançamento: </label>
                                            <input
                                                type="date"
                                                id="releaseDate"
                                                value={releaseDate}
                                                onChange={(e) => setReleaseDate(e.target.value)}
                                                className="form-control form-border"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="imageUrl" className="form-label">URL da imagem: </label>
                                            <input
                                                type="text"
                                                id="imageUrl"
                                                value={imageUrl}
                                                onChange={(e) => setImageUrl(e.target.value)}
                                                required
                                                className="form-control form-border"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-outline-info">Criar</button><br />
                                    </Form>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </section>
        </Container>
    )
}