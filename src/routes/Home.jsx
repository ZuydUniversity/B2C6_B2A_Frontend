import '../styling/Main.css';
import '../styling/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import  { useState, useEffect } from 'react';
import { Table, Card, Button } from 'react-bootstrap';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Hier kunnen API calls komen om data op te halen
        setAppointments([
            { id: 1, patient: 'John Doe', date: '2024-06-25', time: '10:00', notes: 'Routine check-up' },
            { id: 2, patient: 'Jane Smith', date: '2024-06-25', time: '11:00', notes: 'Follow-up' },
        ]);
        setSchedule([
            { id: 1, task: 'Team Meeting', date: '2024-06-25', time: '13:00' },
            { id: 2, task: 'Surgery', date: '2024-06-26', time: '09:00' },
        ]);
        setMessages([
            { id: 1, from: 'Admin', message: 'Nieuwe update beschikbaar' },
            { id: 2, from: 'Lab', message: 'Resultaten bloedtest zijn binnen' },
        ]);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container formwidth">
                <h1 className="centered_title">Welkom bij het Artsen dashboard</h1>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <Card>
                            <Card.Header>Afspraken</Card.Header>
                            <Card.Body>
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Patiënt</th>
                                            <th>Datum</th>
                                            <th>Tijd</th>
                                            <th>Notities</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map(appointment => (
                                            <tr key={appointment.id}>
                                                <td>{appointment.patient}</td>
                                                <td>{appointment.date}</td>
                                                <td>{appointment.time}</td>
                                                <td>{appointment.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-6">
                        <Card>
                            <Card.Header>Agenda</Card.Header>
                            <Card.Body>
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Taak</th>
                                            <th>Datum</th>
                                            <th>Tijd</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.task}</td>
                                                <td>{item.date}</td>
                                                <td>{item.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row mt-4 pb-4">
                    <div className="col-12">
                        <Card>
                            <Card.Header>Berichten</Card.Header>
                            <Card.Body>
                                {messages.map(message => (
                                    <div key={message.id} className="mb-3">
                                        <strong>Van: {message.from}</strong>
                                        <p>{message.message}</p>
                                        <Button className="btn btn-outline-primary">Bekijk</Button>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorDashboard;
