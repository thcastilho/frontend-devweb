import "../styles/Admin.modules.css";
import { Link } from "react-router-dom";

export default function AdminPanel() {


    return (
            <>
            <div className="container">
                <h1 className="admin-txt">Painel de Administrador</h1>
                <div className="column">
                    <div className="posts">
                        <b>Posts</b>
                        <Link to="/criar-post" className="mb-3"><p><button className="btn botao btn-info">Criar novo post</button></p></Link>
                        <Link to="/" className="mb-3"><p><button className="btn botao btn-info">Editar post</button></p></Link>
                        <Link to="/" className="mb-3"><p><button className="btn botao btn-info">Excluir post</button></p></Link>
                    </div>
                    <div className="generos">
                        <b>Gêneros</b>
                        <Link to="/criar-genero" className="mb-3"><p><button className="btn botao btn-info">Criar novo gênero</button></p></Link>
                        <Link to="/" className="mb-3"><p><button className="btn botao btn-info">Editar gênero</button></p></Link>
                        <Link to="/" className="mb-3"><p><button className="btn botao btn-info">Excluir gênero</button></p></Link>
                    </div>
                </div>
            </div>
            </>
            )
}
