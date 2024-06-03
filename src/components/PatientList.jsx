import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    return (
        <ul>
            {patients.map((patient, index) => (
                <li key={index}>
                    <div className="Content">
                        <p>name: {patient.Name}</p>
                        <p>name: {patient.Email}</p>
                        <p>name: {patient.Birthdate}</p>
                        <p>name: {patient.Gender}</p>
                        <p>name: {patient.Lastname}</p>
                        <p>name: {patient.Phone_number}</p>
                        <p>D: {patient.Diagnosis}</p>
                        <p>A: {patient.Age}</p>
                    </div>

                </li>
            ))}
        </ul>
    );
};

export default PatientList;