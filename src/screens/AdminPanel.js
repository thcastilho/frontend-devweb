import "../styles/AdminPanel.modules.css";
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { MDBRow, MDBCard, MDBCardBody, MDBCol, MDBTypography } from "mdb-react-ui-kit"

export default function AdminPanel() {
    return (
        <Container style={{ paddingTop: "30px" }}>
            <section>
                <MDBRow>
                    <MDBCol>
                        <MDBCard className="w-100">
                            <MDBCardBody className="p-4">
                                <MDBTypography tag="h2">Painel de Administrador</MDBTypography>
                                    <div className="column">
                                        <div className="posts">
                                            <b>Posts</b>
                                            <div className="mb-3">
                                                <Link to="/criar-post">
                                                    <button className="btn botao btn-info">Criar novo post</button>
                                                </Link>
                                            </div>
                                            {/* <div className="mb-3">
                                                <Link to="/">
                                                    <button className="btn botao btn-info">Editar post</button>
                                                </Link>
                                            </div> */}
                                            <div className="mb-3">
                                                <Link to="/excluir-post">
                                                    <button className="btn botao btn-info">Excluir post</button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="generos">
                                            <b>Gêneros</b>
                                            <div className="mb-3">
                                                <Link to="/criar-genero">
                                                    <button className="btn botao btn-info">Criar novo gênero</button>
                                                </Link>
                                            </div>
                                            {/* <div className="mb-3">
                                                <Link to="/">
                                                    <button className="btn botao btn-info">Editar gênero</button>
                                                </Link>
                                            </div> */}
                                            <div className="mb-3">
                                                <Link to="/excluir-genero">
                                                    <button className="btn botao btn-info">Excluir gênero</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </section>
        </Container>
    );
}
