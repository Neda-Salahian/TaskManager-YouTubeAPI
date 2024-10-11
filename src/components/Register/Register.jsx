
//IMPORT BOOTSTRAP AND CSS HERE
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

//IMPORT REACT
import { useState } from 'react';

//IMPORT SCSS
import './Register.scss';
function Register({openModalRegister, setOpenModalRegister}) {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

const handleClose = () => setOpenModalRegister(false);

function handleRegister () {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);

    if(user) {
        setError('User already exists');
        return;
    } else {
        const newUser = {
            username,
            firstname,
            lastname,
            email,
            password
        }

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('User created successfully');
        setOpenModalRegister(false);
        setUsername('');
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');    
    }
}
  return (
    <>
       <Modal show={openModalRegister} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="firstname"
                placeholder="firstname"
                autoFocus
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="lastname"
                placeholder="lastname"
                autoFocus
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Register