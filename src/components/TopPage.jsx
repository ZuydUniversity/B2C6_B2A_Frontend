import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

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
        <div className="container formwidth">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <BackButton />
                <h1>{headerName}</h1>
                <div className="d-flex align-items-center">
                    <img 
                        src={imageSrc} 
                        alt="Patient" 
                        className="img-thumbnail me-3" 
                        style={{ width: '100px', height: '100px' }} 
                    />
                    <div>
                        <h3>{patientName}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopPage;
