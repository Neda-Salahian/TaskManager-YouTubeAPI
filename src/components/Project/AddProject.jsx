import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

//IMPORT REACT
import { useState } from 'react';
import moment from 'moment';
function AddProject({ modalProject, setModalProject, setCountProject, countProject, setProjects }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

   

    const handleClose = () => {
        setModalProject(false);
        setNameError('');
        setDescriptionError('');
    };

    function handleAddProject() {
        if (name === '') {
            setNameError('Project name is required');
        } else {
            setNameError('');
        }
        if (description === '') {
            setDescriptionError('Project description is required');
        } else {
            setDescriptionError('');
        }
        if (name === '' || description === '') {
            return;
        }

        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const project = projects.find(project => project.name === name);
        if (project) {
            setNameError('Project already exists');
            return;
        } else {
            const newProject = {
                name,
                description,
                dateCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
            };
            projects.push(newProject);
            localStorage.setItem('projects', JSON.stringify(projects));
            setCountProject(countProject + 1);
            setProjects(projects);
            setModalProject(false);
            alert('Project created successfully');
            setName('');
            setDescription('');
        }
    }
    return (
        <>
            <Modal show={modalProject} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                type="projectname"
                                placeholder="Project Name"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </Form.Group>
                        {nameError && <div style={{ color: 'red' }}>{nameError}</div>}

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        >
                            <Form.Label>Description Project</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        {descriptionError && <div style={{ color: 'red' }}>{descriptionError}</div>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddProject} >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default AddProject