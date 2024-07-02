// DoctorDashboard.jsx
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import kid_1 from '../assets/kid_1.png';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

//Doctordashboard hergebruikt voor het grootste deel het patientdashboard, het enige verschil is de manier waarop notities opgehaald worden (via doctorid en met patientnaam erbij)
const DoctorDashboard = () => {
    const [patientName, setPatientName] = useState('');
    const [doctorNotes, setDoctorNotes] = useState([]); 
    const [patientAppointments, setPatientAppointments] = useState([]); 
    const navigate = useNavigate();
    const { patientId } = useParams();

    useEffect(() => {
        async function GetAccountInfo(){
            try {
                const authToken = Cookies.get('auth_token');
                if (!authToken) {
                    throw new Error('Not authenticated');
                }
                const response = await fetch('http://127.0.0.1:5000/get_account_info', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        credentials: "include"
                    },
                    body: JSON.stringify({ auth_token: authToken })
                });
    
                if (!response.ok) {
                    if(response.status === 500) {
                        throw new Error('Server error, probeer het later opnieuw');
                    }
                    throw new Error('Error met het authenticeren, probeer het later opniew');
                }
    
                if (response.ok) {
                
                   let data = await response.json();
                   let role = data.role;
                   let id = data.user_id;
                   if(role != 1) {
                       throw new Error('Geen toegang tot deze pagina (rol)');
                   }
                   else if(patientID != id){
                    throw new Error('Geen toegang tot deze pagina (id)');
                   }
                }
            } catch (error) {
                console.error('Auth error:', error);
                navigate('/');
            }
        }
        GetAccountInfo();

        const fetchPatientName = async () => { // Functie om de naam van de gebruiker op te halen (werkt ook voor dokter)
            try {
                const response = await fetch(`http://localhost:5000/getuserfirstnamelastname/${patientId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const patientData = await response.json();
                if (patientData.length > 0) {
                    setPatientName(patientData[0].Name + " " + patientData[0].Lastname); 
                } else {
                    console.error('No name found for this user');
                }
            } catch (error) {
                console.error(`Failed to fetch patient: ${error}`);
            } 
        };

        const fetchDoctorNotes = async () => { // Functie om alle notities gelinkt aan de dokter op te halen, met patientnaam erbij. Geen limiet.
            try {
                const response = await fetch(`http://localhost:5000/patients/${patientId}/doctornotes`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const notesData = await response.json();
                setDoctorNotes(notesData);
            } catch (error) {
                console.error(`Failed to fetch doctor notes: ${error}`);
            }
        };

        const fetchPatientAppointments = async () => { // Functie om patients komende afspraken op te halen (werkt ook voor dokter). Limiet van 5
            try {
                const response = await fetch(`http://localhost:5000/patients/${patientId}/upcomingappointments`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const appointmentsData = await response.json();
                setPatientAppointments(appointmentsData); 
            } catch (error) {
                console.error(`Failed to fetch patient upcoming appointments: ${error}`);
            }
        };

        fetchPatientAppointments();
        fetchPatientName();
        fetchDoctorNotes(); 
    }, [patientId]);

    const handleClick = () => {
        navigate('/kalender'); // Wanneer iemand op de kalender klikt navigeren naar de kalender pagina
        // Momenteel gebeurt er niks wanneer er op een notitie geklikt wordt
    };

    const handleTableRowClick = () => {
        handleClick();
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={kid_1} alt="Kind foto" style={{ width: '40%', transform: 'scale(0.4)', marginTop: '-40px', marginLeft: '100px' }} />
                <span style={{ marginLeft: '0px', marginTop: '0px' }}>Welkom, {patientName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <table style={{ marginLeft: '30px', marginTop: '10px' }}>
                        <thead>
                            <tr>
                                <th style={{ color: 'black' }}>Datum</th>
                                <th style={{ color: 'black' }}>Beschrijving</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Weergeven komende afspraken in tabel */}
                            {patientAppointments.length > 0 ? (
                                patientAppointments.map((appointment, index) => (
                                    <tr key={index} onClick={handleTableRowClick}>
                                        <td style={{ color: 'black' }}>{appointment.Date}</td>
                                        <td style={{ color: 'black' }}>{appointment.Description}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" style={{ color: 'black' }}>Geen afspraken gevonden</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Weergeven dokter notities in tabel */}
                    {doctorNotes.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ color: 'black' }}>Datum</th>
                                    <th style={{ color: 'black' }}>Notitie</th>
                                    <th style={{ color: 'black' }}>Patiëntnaam</th>
                                    <th style={{ color: 'black' }}>Patiëntachternaam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctorNotes.map((note, index) => (
                                    <tr key={index}>
                                        <td style={{ color: 'black' }}>{note.Date}</td>
                                        <td style={{ color: 'black' }}>{note.Type}</td>
                                        <td style={{ color: 'black' }}>{note.Name}</td>
                                        <td style={{ color: 'black' }}>{note.Lastname}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Geen notities gevonden</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
