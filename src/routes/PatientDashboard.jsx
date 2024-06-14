// PatientDashboard.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import kid_1 from '../assets/kid_1.png';

const PatientDashboard = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/kalender');
    };

    // Dummy data voor afspraken lijst
    const appointments = [
        { date: '2024-10-03', time: '10:00', doctor: 'Dr. Smith' },
        { date: '2024-10-02', time: '11:30', doctor: 'Dr. Johnson' },
        { date: '2024-10-01', time: '12:00', doctor: 'Dr. Williams' },
    ];

    // Dummy data voor notities
    const notes = [
        { date: '2024-10-05', content: 'Radiologie goed' },
        { date: '2024-10-04', content: 'Nieuwe medicatie geven' },
        { date: '2024-10-03', content: 'Nieuwe oefeningen uitvoeren' },
        { date: '2024-10-02', content: 'Afspraak inplannen met dokter Janssen' }, 
        { date: '2024-10-01', content: 'Klachten aan linker schouder' },                     
    ];

    const handleTableRowClick = () => {
        handleClick();
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ marginRight: '60px', marginTop:'50px', color: 'black' }}>Welkom, Voornaam Achternaam</h2>
                <img src={kid_1} alt="Kind foto" style={{ width: '40%', transform: 'scale(0.4)', marginTop: '-170px', marginLeft: '-700px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2 style={{ color: 'black', fontSize: '25px', marginRight: '145px', marginTop: '-80px' }}>Afspraken</h2>
                    <table style={{ marginLeft: '30px', marginTop: '10px' }}>
                        <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Tijd</th>
                                <th>Doctor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={index} onClick={handleTableRowClick}>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.doctor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2 style={{ color: 'black', marginTop: '-170px', marginRight: '400px', fontSize: '25px' }}>Notities</h2>
                    <table style={{ marginLeft: '20px', marginTop: '10px' }}>
                        <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Inhoud</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, index) => (
                                <tr key={index}>
                                    <td>{note.date}</td>
                                    <td>{note.content}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;