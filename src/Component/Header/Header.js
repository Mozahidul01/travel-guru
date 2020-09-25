import React, { useContext } from 'react';
import './Header.css'
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../Images/Logo.png';
import { Container, Nav, Navbar} from 'react-bootstrap';
import { PlaceContext } from '../../App';
import { Link } from 'react-router-dom';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(PlaceContext)
    
    return (
        <Navbar collapseOnSelect expand="md" bg="transparent">
            <Container>
                <Navbar.Brand href="/">
                    <img className="logo" src={logo} alt="Logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <input className="search-area" type="text" placeholder="Search Your Destination" aria-label="Search" />
                    </Nav>
                    <Nav>
                        <Nav.Link className="nav-links" to="#!">News</Nav.Link>
                        <Nav.Link className="nav-links" to="#!">Destination</Nav.Link>
                        <Nav.Link className="nav-links" to="#!">Blog</Nav.Link>
                        <Nav.Link className="nav-links" to="#!">Contact</Nav.Link>
                        
                        {
                            loggedInUser.email ? <Link to="/" className="user-name mr-5">{loggedInUser.name}</Link> : 
                            <Link to="/login" className=" mr-5"> <button className=" login-btn">Login</button></Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
);
};

export default Header;