import "../styles/AdminPanel.modules.css";
import { Link } from "react-router-dom";

export default function AdminPanel() {
    return (
        <div className="container">
            <h1 className="admin-txt">Painel de Administrador</h1>
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
        </div>
    );
}
