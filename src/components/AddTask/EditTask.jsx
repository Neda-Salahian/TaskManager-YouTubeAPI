//IMPORT BOOTSTRAP AND CSS HERE
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from 'react';


//IMPORT REACT
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditTask ({ taskEdit, tasks, setTasks, projects, modalEditTask, setModalEditTask }) {

    const [nameTask, setNameTask] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [projectError, setProjectError] = useState('');

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // Set initial values when projectEdit changes
    useEffect(() => {
        if (taskEdit) {
            setNameTask(taskEdit.name);
            setTaskDescription(taskEdit.description);
            setSelectedProject(taskEdit.projects);
            setStartDate(new Date(taskEdit.dateStart));
            setEndDate(new Date(taskEdit.dateEnd));
        }
    }, [taskEdit]);

    const handleClose = () => {
        setModalEditTask(false);
        setNameError('');
        setDescriptionError('');
    };


    const handleEditTask = () => {
        if (nameTask === '') {
            setNameError('Task name is required');
        } else {
            setNameError('');
        }    
        if (taskDescription === '') {
            setDescriptionError('Task description is required');
        } else {
            setDescriptionError('');
        }
        if (!selectedProject) {
            setProjectError('Project is required');
        } else {
            setProjectError('');
        }
        if (nameTask === '' || taskDescription === '' || !selectedProject) {
            return;
        }
        const updatedTasks = tasks.map(task =>
            task.name === taskEdit.name
                ? { ...task, name : nameTask, description: taskDescription , projects: selectedProject, dateCreated: new Date().toLocaleDateString(), dateStart: startDate, dateEnd: endDate }
                : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setModalEditTask(false);
        alert('Task updated successfully');
    };
    return (
        <>
            <Modal show={modalEditTask} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTaskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={nameTask}
                                autoFocus
                                value={nameTask}
                                onChange={e => setNameTask(e.target.value)}
                            />
                            {nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}       
                        </Form.Group>

                        <Form.Group controlId="formTaskDescription">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter task description"
                                value={taskDescription}
                                onChange={e => setTaskDescription(e.target.value)}
                            />
                            {descriptionError && <Form.Text className="text-danger">{descriptionError}</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="formProject">
                            <Form.Label>Select Project</Form.Label>
                            <Form.Select
                                value={selectedProject}
                                onChange={e => setSelectedProject(e.target.value)}
                            >
                                <option value="">Select a project</option>
                                {projects.map(project => (
                                    <option key={project.name} value={project.name}>
                                        {project.name}
                                    </option>
                                ))}
                            </Form.Select>
                            {projectError && <Form.Text className="text-danger">{projectError}</Form.Text>} 
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="startDate">
                            <Form.Label>Start Date and Time</Form.Label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="form-control"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="endDate">
                            <Form.Label>End Date and Time</Form.Label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="form-control"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleEditTask}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default EditTask;