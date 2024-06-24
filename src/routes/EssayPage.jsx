import Navbar from '../components/Navbar'; // Double period to go back one directory
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';
import App from '../App';
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
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        getAppointments();
    }, []);

    const DataRow = ({ date, appointment, note }) => (
        <tr>
            <td className="text-cell"><div className="rounded-left">{date}</div></td>
            <td className="text-cell"><div className="middle-text-cell">{appointment}</div></td>
            <td className="text-cell"><div className="rounded-right">{note}</div></td>
        </tr>
    );



    const DataTable = ({ data }) => (
        <>
            <table className="patientoverview-datatable">
                <thead>
                    <tr>
                        <th className="th-header-left"><div className="header-rounded-left header-item">Datum</div></th>
                        <th className="th-header-middle"><div className="header-rounded-middle header-item">Afspraak</div></th>
                        <th className="th-header-right"><div className="header-rounded-right header-item">Notitie</div></th>
                    </tr>
                </thead>
            </table>


            <div className="patientoverview-scrollable-table">
                <table>
                    <tbody>
                        {data.map((row, index) => <DataRow key={index} {...row} />)}
                    </tbody>
                </table>
            </div>
        </>
    );

    const data = Appointments.map(appointment => ({
        date: new Date(appointment.Date).toLocaleDateString('en-CA'), // Converts to 'YYYY-MM-DD' format
        appointment: appointment.Description,
        note: appointment.Note
    }));

    return (
        <>
            <Navbar />
            <TopPage headerName="Verslagen" patientId={patientId} imageSrc={imageSrc} />
            <div className="content">
                <DataTable data={data} />
            </div>
        </>
    );
};

export default EssayPage;