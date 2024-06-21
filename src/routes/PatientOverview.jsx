import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopPage from '../components/TopPage';

function PatientOverview() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const getPatients = async () => {
            try {
                const response = await fetch('http://localhost:5000/get_patients');
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        getPatients();
    }, []);

    const navigate = useNavigate();

    const DataRow = ({ imageSrc, name, birthdate, diagnosis, id }) => (
        <tr onClick={() => navigate(`/patientview/${id}`)}>
            <td><img src={imageSrc} alt="Profile" className="img-fluid rounded" /></td>
            <td>{name}</td>
            <td>{birthdate}</td>
            <td>{diagnosis}</td>
        </tr>
    );

    const DataTable = ({ data }) => (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Diagnosis</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => <DataRow key={index} {...row} />)}
                </tbody>
            </table>
        </div>
    );

    // const data = [
    //     { imageSrc: 'src/assets/kid_1.png', name: , birthdate: '14/03/2016', diagnosis: 'Flu' },
    //     { imageSrc: 'src/assets/kid_2.png', name: 'Henry Pot', birthdate: '24/07/2015', diagnosis: 'Flu' },
    //     { imageSrc: 'src/assets/kid_3.png', name: 'Sabine Edo', birthdate: '08/05/2016', diagnosis: 'Flu' },
    //     { imageSrc: 'src/assets/kid_1.png', name: 'John Doe', birthdate: '14/03/2016', diagnosis: 'Flu, flue, foee, fluee, fleueeeeeeeeeeeeeeeeeeeeee, FLueee, FLuiee,', },
    //     { imageSrc: 'src/assets/kid_2.png', name: 'Henry Pot', birthdate: '24/07/2015', diagnosis: 'Flu' },
    //     { imageSrc: 'src/assets/kid_3.png', name: 'Sabine Edo', birthdate: '08/05/2016', diagnosis: 'Flu' },
    //     { imageSrc: 'src/assets/kid_1.png', name: 'John Doe', birthdate: '14/03/2016', diagnosis: 'Flu' },
    //     { imageSrc: 'src/assets/kid_2.png', name: 'Henry Pot', birthdate: '24/07/2015', diagnosis: 'Flu' },
    //     { imageSrc: 'src/assets/kid_3.png', name: 'Sabine Edo', birthdate: '08/05/2016', diagnosis: 'Flu' },
    //     { imageSrc: 'src/assets/kid_1.png', name: 'John Doe', birthdate: '14/03/2016', diagnosis: 'Flu' },
    //     { imageSrc: 'src/assets/kid_2.png', name: 'Henry Pot', birthdate: '24/07/2015', diagnosis: 'Flu' },
    //     { imageSrc: 'src/assets/kid_3.png', name: 'Sabine Edo', birthdate: '08/05/2016', diagnosis: 'Flu' }
    // ];

    let data = [];
    patients.forEach(patient => {
        data.push({
            imageSrc: 'src/assets/kid_1.png',
            name: patient.Name,
            birthdate: patient.Birthdate,
            diagnosis: "jdm",
            id: patient.Id
        });
    });

    return (
        <>
            <Navbar/>
            <TopPage/>
            <h1 className="centered_title"><i className="bi bi-people-fill"></i> Patiëntenoverzicht</h1>
            <div className="container mt-4">
                <DataTable data={data} />
            </div>
        </>
    );
}

export default PatientOverview;