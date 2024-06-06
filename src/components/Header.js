import React, { useState, useEffect } from 'react'
import Logo from '../images/logo.png'
import '../styles/Header.modules.css'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Container, Dropdown } from 'react-bootstrap'
import axios from 'axios'

export default function Header() {
    const [login, setLogin] = useState("")
    const [role, setRole] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('http://localhost:8080/usuarios/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: "json"
            })
                .then(response => {
                    setLogin(response.data.login)
                    setRole(response.data.role)
                    console.log(response.data.login)
                    console.log(response.data.role)
                })
                .catch(error => {
                    console.error('Erro ao buscar informações do usuário', error);
                });
        }
    }, []);

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
                        {login ? (
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className='dropdown-custom'>
                                    Olá, {login}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='menu-custom'>
                                    {role === 'ADMIN' && (
                                        <Dropdown.Item as={Link} to="/admin-panel" className="dropdown-item-custom">Painel Admin</Dropdown.Item>
                                    )}
                                    <Dropdown.Item as={Link} to="/my-data" className="dropdown-item-custom">Meus Dados</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/logout" className="dropdown-item-custom">Sair</Dropdown.Item>
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