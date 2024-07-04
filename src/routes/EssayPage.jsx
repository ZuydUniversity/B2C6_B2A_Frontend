import '../styling/Main.css';
import Navbar from '../components/Navbar'; // Double period to go back one directory
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const EssayPage = () => {
    const { patientId } = useParams();
    const imageSrc = '../src/assets/kid_1.png';

    const [Appointments, setAppointments] = useState([]);
    useEffect(() => {
        const getAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${patientId}/appointment`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setAppointments(data);
                } else {
                    console.error('Error: API did not return an array');
                    setAppointments([]);
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        getAppointments();
    }, [patientId]);

    const DataRow = ({ date, appointment, note }) => (
        <tr>
            <td>{date}</td>
            <td>{appointment}</td>
            <td>{note}</td>
        </tr>
    );

    const DataTable = ({ data }) => (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Afspraak</th>
                        <th>Notitie</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => <DataRow key={index} {...row} />)}
                </tbody>
            </table>
        </>
    );

    const data = Array.isArray(Appointments) ? Appointments.map(appointment => ({
        date: new Date(appointment.Date).toLocaleDateString('en-CA'),
        appointment: appointment.Description,
        note: appointment.Note
    })) : [];

    return (
        <>
            <Navbar />
            <TopPage headerName="Verslagen" patientId={patientId} imageSrc={imageSrc} />
            <div className="container mt-4">
                <DataTable data={data} />
            </div>
        </>
    );
};

export default EssayPage;
