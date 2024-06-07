import React from 'react'
import Logo from '../images/logo.png'
import '../styles/Header.modules.css'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, Navbar, Container, Dropdown } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <Navbar className="header-color">
                <Container>
                    <Navbar.Brand className="logo">
                        <Nav.Link as={Link} to="/">
                            <img src={Logo} alt="musicbox logo" />
                            <span className="span-logo">musicbox</span>
                        </Nav.Link>
                    </Navbar.Brand>
                    <div className="search-flex">
                        <form className="header-search">
                            <input type="text" className="input-search" placeholder="Digite uma música ou álbum..."></input>
                            <i className="bi bi-search"></i>
                        </form>
                    </div>
                    <div className="login">
                        {currentUser ? (
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className='dropdown-custom'>
                                    Olá, {currentUser.login}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='menu-custom'>
                                    {currentUser.role === 'ADMIN' && (
                                        <Dropdown.Item as={Link} to="/admin-panel" className="dropdown-item-custom">Painel Admin</Dropdown.Item>
                                    )}
                                    <Dropdown.Item as={Link} to="/my-data" className="dropdown-item-custom">Meus Dados</Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item-custom" onClick={handleLogout}>Sair</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Nav.Link as={Link} to="/login">
                                <i className="bi bi-person-circle"></i>
                                <span> Entre ou cadastre-se</span>
                            </Nav.Link>
                        )}
                    </div>
                </Container>
            </Navbar>
        </>
    )
}