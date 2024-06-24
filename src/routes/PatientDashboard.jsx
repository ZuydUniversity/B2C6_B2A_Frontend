// PatientDashboard.jsx
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import kid_1 from '../assets/kid_1.png';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const PatientDashboard = () => {
    const navigate = useNavigate();
    // // Naam uit database ophalen functionaliteit is momenteel gecomment omdat het nog niet zo stabiel is (error wanneer dokter op de pagina terecht komt)
    // // Om het te laten werken onderstaande code uncommenten en in lijn 60 "Voornaam achternaam" vervangen naar {patientName}. Opletten dat url moet eindigen met een patientid
    // const { patientId } = useParams(); // patientID ophalen vanuit url
    // const [patientName, setPatientName] = useState('');

    // useEffect(() => {
    //     const fetchPatientName = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:5000/get_patient/${patientId}`);
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             const patientData = await response.json();
    //             setPatientName(patientData.Name + " " + patientData.Lastname); 
    //         } catch (error) {
    //             console.error(`Failed to fetch patient: ${error}`);
    //         }
    //     };

    //     fetchPatientName();
    // }, [patientId]);    

    const handleClick = () => {
        navigate('/kalender'); // Wanneer iemand op de kalender klikt navigeren naar de kalender pagina
        // Later ook toevoegen dat als iemand op note klikt -> navigeren naar note pagina/specifieke note pagina?
    };

    // Dummy data voor afspraken lijst
    const appointments = [
        { date: '2024-10-03', time: '10:00', doctor: 'Dr. Smith' },
        { date: '2024-10-02', time: '11:30', doctor: 'Dr. Johnson' },
        { date: '2024-10-01', time: '12:00', doctor: 'Dr. Williams' },
    ];

    // Dummy data voor notities
    const notes = [
        { date: '2024-10-05', type: 'Radiologie goed' },
        { date: '2024-10-04', type: 'Nieuwe medicatie geven' },
        { date: '2024-10-03', type: 'Nieuwe oefeningen uitvoeren' },
        { date: '2024-10-02', type: 'Afspraak inplannen met dokter Janssen' }, 
        { date: '2024-10-01', type: 'Klachten aan linker schouder' },                     
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
                                    <td>{note.type}</td>
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