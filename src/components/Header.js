import React, { useState } from 'react'
import Logo from '../images/logo.png'
import '../styles/Header.modules.css'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, Navbar, Container, Dropdown } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Autosuggest from 'react-autosuggest'

export default function Header() {
    const { currentUser, logout } = useAuth() // controla autenticação do usuário
    const [searchItem, setSearchItem] = useState("") //controla a query de pesquisa
    const [suggestions, setSuggestions] = useState([]) //controla as sugestões dadas pelo BD
    const navigate = useNavigate() //redirecionamento

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const handleSearchChange = (e, { newValue }) => {
        setSearchItem(newValue) // atualiza o estado da query de pesquisa sempre que o valor do campo de input muda.
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`http://localhost:8080/posts/search?search=${searchItem}`)
            if (response.data && response.data.length > 0) {
                navigate(`/post/${response.data[0].id}`)
                setSearchItem("")
                window.location.reload()
            }
        } catch (error) {
            console.error("Erro ao buscar posts: ", error)
        }
    }

    const fetchSuggestions = async ({ value }) => { // função chamada pelo Autosuggest sempre que valor do input muda
        try {
            const response = await axios.get(`http://localhost:8080/posts/search?search=${value}`) //busca no BD as sugestões
            setSuggestions(response.data || []) // retorna as sugestões ou uma lista vazia
        } catch (error) {
            console.error("Erro ao buscar sugestões: ", error)
        }
    }

    const clearSuggestions = () => {
        setSuggestions([])
    }

    const getSuggestionValue = suggestion => suggestion.name // valor de preenchimento ao selecionar uma sugestão

    const renderSuggestion = suggestion => (
        <div className="autosuggest-suggestion">
            {suggestion.name} {/* define o atributo do objeto retornado que será renderizado na lista de sugestões */}
        </div>
    )

    const inputProps = {
        placeholder: 'Digite uma música ou álbum...',
        value: searchItem, // valor do input
        onChange: handleSearchChange, //sempre que ouver alteração no input, muda o item de pesquisa
        className: 'autosuggest-input'  // Adicionar classe de estilo ao input
    }

    return (
        <> {/* fragmento JSX - evita nós desnecessários */}
            <Navbar className="header-color">
                <Container>
                    <Navbar.Brand className="logo">
                        <Nav.Link as={Link} to="/">
                            <img src={Logo} alt="musicbox logo" />
                            <span className="span-logo">musicbox</span>
                        </Nav.Link>
                    </Navbar.Brand>
                    <div className="search-flex">
                        <form className="header-search" onSubmit={handleSearchSubmit}>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={fetchSuggestions} // chamado toda vez que as sugestões forem recalculadas
                                onSuggestionsClearRequested={clearSuggestions} // limpa as sugestões
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                                theme={{
                                    container: 'autosuggest-container',
                                    suggestionsContainer: 'autosuggest-suggestions-container',
                                    suggestionHighlighted: 'autosuggest-suggestion--highlighted',
                                }}
                            />
                            <i className="bi bi-search" onClick={handleSearchSubmit} style={{ cursor: 'pointer' }}></i>
                        </form>
                    </div>
                    <div className="login">
                        {currentUser ? ( // se o usuário está logado, então um menu dropdown aparece
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
                        ) : ( // se nao, pede ao usuário para entrar ou cadastrar-se
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
