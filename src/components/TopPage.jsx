import React from 'react';
import BackButton from './BackButton'; // Make sure to import the BackButton component
import { useState, useEffect } from 'react';

const TopPage = ({ headerName, imageSrc, patientId }) => {
    const [patientName, setPatientName] = useState('');
    useEffect(() => {
        const fetchPatientName = async (patientId) => {
            try {
                const response = await fetch(`http://localhost:5000/get_patient/${patientId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const patientData = await response.json();
                setPatientName(patientData.Name + " " + patientData.Lastname); 
            } catch (error) {
                console.error(`Failed to fetch patient: ${error}`);
            }
        };

        fetchPatientName(patientId);
    }, [patientId]);

    return (
        <div className="top-page formwidth">
            <div className="top-page-nav-info">
                <BackButton />
                <h1>{headerName}</h1>
            </div>
            <div className="patient-data-block">
                <h3 className="patient-results">{patientName}</h3>
                <img className="patient-image-results" src={imageSrc} alt="patient" />
            </div>
        </div>
    );
};

export default TopPage;
