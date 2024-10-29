// Analytics.js

//IMPORT BOOTSTRAP REACT HERE
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './Analytics.scss';

//IMPORT COMPONENTS HERE
import Sidebar from "../SideBar/SideBar"
// import  getData from "../../data.js"
//IMPORT REACT
import { useState, useEffect } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import moment from 'moment';
function Analytics() {
    // Chart Options: Control & configure the chart
    const [chartOptions, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        data: [],
        // Series: Defines which chart type and data to use
        series: [{ type: 'bar', xKey: 'month', yKey: 'tasks' }],
    });

    // Chart Options: Control & configure the chart
    const [chartProjectOptions, setChartProjectOptions] = useState({
        // Data: Data to be displayed in the chart
        data: [],
        // Series: Defines which chart type and data to use
        series: [{ type: 'bar', xKey: 'month', yKey: 'projects' }],
    });

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskCounts = Array(12).fill(0);

        storedTasks.forEach(task => {
            const month = moment(task.dateCreated, 'YYYY-MM-DD').month(); // Get the month (0-11)
            taskCounts[month]++;
        });

        const chartData = taskCounts.map((count, index) => ({
            month: moment().month(index).format('MMM'), // Convert month index to abbreviated month name
            tasks: count
        }));

        setChartOptions({
            data: chartData,
            series: [{ type: 'bar', xKey: 'month', yKey: 'tasks' }],
        });
    }, []);


    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        const projectCounts = Array(12).fill(0);

        storedProjects.forEach(project => {
            const month = moment(project.dateCreated, 'YYYY-MM-DD').month(); // Get the month (0-11)
            projectCounts[month]++;
        });

        const chartData = projectCounts.map((count, index) => ({
            month: moment().month(index).format('MMM'), // Convert month index to abbreviated month name
            projects: count
        }));

        setChartProjectOptions({
            data: chartData,
            series: [{ type: 'bar', xKey: 'month', yKey: 'projects' }],
        });
    }, []);


    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <Sidebar />
                    </Col>
                    <Col md={10}>
                        <Row>
                            <Col md={12} style={{ marginBottom: '20px' }}>
                                <div style={{ height: '400px' }}>
                                    <AgChartsReact options={chartOptions} />
                                </div>
                            </Col>
                            <Col md={12}>
                                <div style={{ height: '400px' }}>
                                    <AgChartsReact options={chartProjectOptions} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Analytics;
