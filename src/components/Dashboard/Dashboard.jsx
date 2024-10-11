//IMPORT BOOTSTRAP REACT HERE
import Sidebar from "../SideBar/SideBar"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/Table';

//IMPORT CSS AND SCSS HERE
import './Dashboard.scss';

//IMPORT REACT
import { useEffect, useState } from "react";
import moment from 'moment';
import { differenceInHours, differenceInMinutes } from 'date-fns';

//IMPORT COMPONENTS HERE
import AddTask from "../AddTask/AddTask";
import AddProject from "../Project/AddProject";
import EditProject from "../Project/EditProject";
import EditTask from "../AddTask/EditTask";

function Dashboard() {

    const [modalTask, setModalTask] = useState(false);
    const [modalProject, setModalProject] = useState(false);
    const [countProject, setCountProject] = useState(0);
    const [countTask, setCountTask] = useState(0);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [projectListShow, setProjectListShow] = useState(true);
    const [taskListShow, setTaskListShow] = useState(true);
    const [projectEdit, setProjectEdit] = useState(null);
    const [modalEditProject, setModalEditProject] = useState(false);

    const [taskEdit, settaskEdit] = useState(null);
    const [modalEditTask, setModalEditTask] = useState(false);
    

    function handleModalTask() {
        setModalTask(true)
    }
    function handleModalProject() {
        setModalProject(true)
    }

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjects(storedProjects);
        setCountProject(storedProjects.length);
    }, []);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
        setCountTask(storedTasks.length);
    }, []);

    function handleListProjectToggle() {
        setProjectListShow(!projectListShow)
    }

    function handleListTaskToggle() {
        setTaskListShow(!taskListShow)
    }


    function handleEditProject (project) {
        setProjectEdit(project)
        setModalEditProject(true)
    }

    function handleEditTask (task) {
        settaskEdit(task)
        setModalEditTask(true)
    }

    function handleDeleteProject (project) {
        const updatedProjects = projects.filter(p => p !== project);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
        alert('Project deleted successfully');
        setCountProject(countProject - 1);
    }

    function handleDeleteTask(task) {
        const updatedTasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        alert('Task deleted successfully');
        setCountTask(countTask - 1);
    }

    // Update the projects and tasks state when a project is edited
    function handleProjectUpdate(updatedProject, originalProjectName) {
        const updatedProjects = projects.map(project =>
            project.name === originalProjectName ? updatedProject : project
        );

        const updatedTasks = tasks.map(task =>
            task.projects === originalProjectName
                ? { ...task, projects: updatedProject.name }
                : task
        );

        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setProjects(updatedProjects);
        setTasks(updatedTasks);
    }

    function calculateDuration(startDate, endDate) {
        const hours = differenceInHours(new Date(endDate), new Date(startDate));
        const minutes = differenceInMinutes(new Date(endDate), new Date(startDate)) % 60;
        
        return `${hours} hours, ${minutes} minutes`;
    }
    
    return (
        <>
            <div className="container-fluid d-flex">
                <Sidebar />
                <div className="content ms-3">
                    <Row>
                        <Card>
                            <Card.Body>
                                <Card.Title>Projects</Card.Title>
                                <Card.Text>
                                    {countProject}
                                </Card.Text>
                                <Button variant="success" onClick={handleModalProject}>Add</Button>
                                <Button variant="warning" onClick={handleListProjectToggle}>List</Button>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Body>
                                <Card.Title>Tasks</Card.Title>
                                <Card.Text>
                                {countTask}
                                </Card.Text>
                                <Button variant="success" onClick={handleModalTask}>Add </Button>
                                <Button variant="warning" onClick={handleListTaskToggle}>List</Button>
                            </Card.Body>
                        </Card>
                        <Col md={12} className="mb-2">
                            <Toast show={projectListShow} onClose={handleListProjectToggle}>
                                <Toast.Header>
                                    <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                    />
                                    <strong className="me-auto">Project List</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Number</th>
                                                <th>Project Name</th>
                                                <th>Description</th>
                                                <th>Date Created</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projects.map((project, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{project.name}</td>
                                                    <td>{project.description}</td>
                                                    <td>{moment(project.dateCreated).format('YYYY-MMM-DD, h:mm:ss a')}</td>
                                                    <td>
                                                        <Button variant="success" onClick={() => handleEditProject(project)}>Edit</Button>
                                                        <Button variant="danger" onClick={() => handleDeleteProject(project)}>Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Toast.Body>
                            </Toast>
                        </Col>
                        <Col md={12} className="mb-2">
                            <Toast show={taskListShow} onClose={handleListTaskToggle}>
                                <Toast.Header>
                                    <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                    />
                                    <strong className="me-auto">Task List</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Number</th>
                                                <th>Task Name</th>
                                                <th>Project</th>
                                                <th>Description</th>
                                                <th>Date Created</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Total hours</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map((task, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{task.name}</td>
                                                    <td>{task.projects}</td>
                                                    <td>{task.description}</td>
                                                    <td>{moment(task.dateCreated).format('YYYY-MMM-DD, h:mm:ss a')}</td>
                                                    <td>{moment(task.dateStart).format('YYYY-MMM-DD, h:mm:ss a')}</td>
                                                    <td>{moment(task.dateEnd).format('YYYY-MMM-DD, h:mm:ss a')}</td>
                                                    <td>{calculateDuration(task.dateStart, task.dateEnd)}</td>
                                                    <td>
                                                        <Button variant="success" onClick={() => handleEditTask(task)}>Edit</Button>
                                                        <Button variant="danger" onClick={() => handleDeleteTask(task)}>Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Toast.Body>
                            </Toast>
                        </Col>
                    </Row>
                </div>
            </div>

            <AddTask modalTask={modalTask} setModalTask={setModalTask} projects={projects} countTask={countTask} setCountTask={setCountTask} setTasks={setTasks} />
            <AddProject modalProject={modalProject} setModalProject={setModalProject} countProject={countProject} setCountProject={setCountProject} setProjects={setProjects}  />

            <EditProject projectEdit={projectEdit} setProjectEdit={setProjectEdit} projects={projects} countProject={countProject} setCountProject={setCountProject} setModalEditProject={setModalEditProject} setProjects={setProjects} modalEditProject={modalEditProject} onProjectUpdate={handleProjectUpdate} />
            <EditTask taskEdit={taskEdit} settaskEdit={settaskEdit} tasks={tasks} countTask={countTask} setCountTask={setCountTask} setModalEditTask={setModalEditTask} setTasks={setTasks} projects={projects} modalEditTask={modalEditTask} />
        </>
    )
}

export default Dashboard
