import { useState, useEffect } from 'react';
import PatientList from './PatientList';
import PatientSettingsPage from './PatientSettingsPage';

const ParentComponent = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Replace this with the actual API call
        fetch('/api/patients')
            .then(response => response.json())
            .then(data => setPatients(data));
    }, []);

    return (
        <div>
            <PatientList patients={patients} />
            <PatientSettingsPage patients={patients} />
        </div>
    );
};

export default ParentComponent;