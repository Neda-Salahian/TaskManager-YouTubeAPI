import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditProject({ modalEditProject, setModalEditProject, projectEdit, setProjects, projects, onProjectUpdate }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    // Set initial values when projectEdit changes
    useEffect(() => {
        if (projectEdit) {
            setName(projectEdit.name);
            setDescription(projectEdit.description);
        }
    }, [projectEdit]);

    const handleClose = () => {
        setModalEditProject(false);
        setNameError('');
        setDescriptionError('');
    };

    const handleEditProject = () => {
        if (!name.trim()) {
            setNameError('Project name is required');
            return;
        } else {
            setNameError('');
        }

        if (!description.trim()) {
            setDescriptionError('Project description is required');
            return;
        } else {
            setDescriptionError('');
        }

        // const updatedProject = projects.map(project =>
        //     project.name === projectEdit.name
        //         ? { ...project, name, description, dateCreated: new Date().toLocaleDateString()}
        //         : project
        // );

        const updatedProject = {
            ...projectEdit,
            name,
            description,
            dateCreated: new Date().toLocaleDateString()
        };

        // localStorage.setItem('projects', JSON.stringify(updatedProject));
        // setProjects(updatedProject);
        // onProjectUpdate(updatedProject, projectEdit.name);
        // setModalEditProject(false);
        // alert('Project updated successfully');

        onProjectUpdate(updatedProject, projectEdit.name);
        setModalEditProject(false);
        alert('Project updated successfully');
    };

    return (
        <>
            <Modal show={modalEditProject} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formProjectName">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProjectDescription">
                            <Form.Label>Project Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter project description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                            {descriptionError && <div style={{ color: 'red' }}>{descriptionError}</div>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleEditProject}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditProject;
