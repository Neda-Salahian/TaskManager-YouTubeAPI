//IMPORT BOOTSTRAP AND CSS HERE
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


//IMPORT REACT
import { useState } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";


function AddTask({ modalTask, setModalTask, name, setTasks, projects, setCountTask, countTask }) {

    const [nameTask, setNameTask] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [projectError, setProjectError] = useState('');

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());



    const handleClose = () => {
        setModalTask(false);
        setNameTask('');
        setTaskDescription('');
        setSelectedProject(null);
        setStartDate(new Date());
        setEndDate(new Date());
        setNameError('');
        setDescriptionError('');
        setProjectError('');
    };

    function handleAddTask() {
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

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(task => task.nameTask === nameTask);
        if (task) {
            setNameError('Task already exists');
            return;
        } else {
            const newTask = {
                name: nameTask,
                description: taskDescription,
                dateCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
                dateStart: startDate,
                dateEnd: endDate,
                projects: selectedProject.name
            };

            
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            setCountTask(countTask + 1);
            setTasks(tasks);
            setModalTask(false);
            alert('Task created successfully');
            setNameTask('');
            setTaskDescription('');
            setSelectedProject(null);
        }
    }
    

    return (
        <>
            <Modal show={modalTask} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="taskname"
                                placeholder="Task Name"
                                autoFocus
                                onChange={(e) => setNameTask(e.target.value)}
                                value={name}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="projectDropdown">
                            <Form.Label>Select Project</Form.Label>
                            <Form.Select
                                aria-label={selectedProject ? selectedProject.name : "Select a project"}
                                onChange={(e) => {
                                    const project = projects.find(proj => proj.name === e.target.value);
                                    setSelectedProject(project);
                                }}>
                                <option>Select a project</option>
                                {projects.map((project, index) => (
                                    <option key={index} value={project.name}>{project.name}</option>
                                ))}
                            </Form.Select>
                            {projectError && <div style={{ color: 'red' }}>{projectError}</div>}
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

                        <Form.Group className="mb-3" controlId="taskDescription">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter task description"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                            {descriptionError && <div style={{ color: 'red' }}>{descriptionError}</div>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddTask}>
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default AddTask