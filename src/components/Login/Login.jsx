
//IMPORT BOOTSTRAP AND CSS HERE
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

//IMPORT REACT
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login({openModalLogin, setOpenModalLogin, setIsLoggedIn}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    function handleLogin () {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);
        if(user) {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            alert('Login successful');
            setOpenModalLogin(false);
            navigate('/Admin');
        } else {
            setError('Invalid username or password');
        }
    }
    const handleClose = () => setOpenModalLogin(false);
    return (
      <>

      <Modal show={openModalLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
          </Form>
          {error && <p> {error} </p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
  }
  
  export default Login