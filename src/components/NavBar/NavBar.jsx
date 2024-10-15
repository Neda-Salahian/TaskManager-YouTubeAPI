//IMPORT BOOTSTRAP REACT HERE
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

//IMPORT REACT
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
//IMPORT YOUR COMPONENTS HERE
import Login from '../Login/Login';
import Register from '../Register/Register';
//IMPORT SCSS
import './NavBar.scss';
//IMPORT IMAGES
import logo from '../../../public/images/channels4_profile.jpg';
function NavBar({ isLoggedIn, setIsLoggedIn }) {
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const navigate = useNavigate();


    // const [show, setShow] = useState(false);


    function handleModalLogin() {
        setOpenModalLogin(true)
    }
    function handleModalRegister() {
        setOpenModalRegister(true)
    }


    function handleLogOut() {
        setIsLoggedIn(false);
        alert('Logout successful');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('users');
        navigate('/');
    }



    return (

        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    {isLoggedIn ? (<NavLink to="/Admin" className="navbar-brand">
                        Dashboard Admin
                    </NavLink>) : (<Navbar.Brand href="/">
                        <Image src={logo} roundedCircle />
                    </Navbar.Brand>)}

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Kita Kids Tv</Nav.Link>
                           
                        </Nav>
                        {isLoggedIn ? (<Button variant="outline-success" onClick={handleLogOut}>Logout</Button>)
                            : (
                                <Form className="d-flex">
                                    <Button  className="me-2" onClick={handleModalLogin}>Login</Button>
                                    <Button onClick={handleModalRegister}>Register</Button>
                                </Form>)}

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Login openModalLogin={openModalLogin} setOpenModalLogin={setOpenModalLogin} setIsLoggedIn={setIsLoggedIn} />
            <Register openModalRegister={openModalRegister} setOpenModalRegister={setOpenModalRegister} />

        </>
    )
}

export default NavBar