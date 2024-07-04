import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const TopPage = ({ imageSrc, patientId }) => {
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
    
        if (patientId) { // Check if patientId is provided before making the API call because for example patientoverview doesnt use a patientId but still made a call.
            fetchPatientName(patientId);
        }
    }, [patientId]);

    return (
        <div className="container formwidth">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <BackButton />
                    <div>
                    <div className="d-flex align-items-center mt-4">
                            <h3 className="me-3 ms-3">{patientName}</h3>
                            <img src={imageSrc} alt="Patient" className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopPage;
