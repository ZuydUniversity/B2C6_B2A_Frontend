import '../styling/Patientenoverzicht.css';
import React, { useState, useEffect } from 'react';
import '../styling/Main.css';
import Navbar from '../components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';

const PatientSettingsPage = () => {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [diagnosis, setDiagnosis] = useState([]);
    const [medications, setMedications] = useState([]);
    
    useEffect(() => {
        const fetchPatient = async (patientId) => {
            try {
                const response = await fetch(`http://localhost:5000/get_patient/${patientId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const patientData = await response.json();
                const patient = {
                    "Birthdate": patientData.Birthdate,
                    "Email": patientData.Email,
                    "Gender": patientData.Gender,
                    "Lastname": patientData.Lastname,
                    "Name": patientData.Name,
                    "Phone_number": patientData.Phone_number,
                };
                setPatient(patient);
            } catch (error) {
                console.error(`Failed to fetch patient: ${error}`);
            }
        };

        fetchPatient(patientId);
    }, [patientId]);

    const getMedication = async (patientId) => {
        try {
            const response = await fetch(`http://localhost:5000/patients/${patientId}/medication`);
            const data = await response.json();
            setMedications(data);
        } catch (error) {
            console.error('Error fetching medication:', error);
        }
    };
    
    const getDiagnosis = async (patientId) => {
        try {
            const response = await fetch(`http://localhost:5000/patients/${patientId}/diagnosis`);
            const data = await response.json();
            setDiagnosis(data);
        } catch (error) {
            console.error('Error fetching diagnoses:', error);
        }
    };

    const imageSrc = '../src/assets/kid_1.png';

    useEffect(() => {
        if (patient) {
            getMedication(patientId);
        }
    }, [patient]);

    useEffect(() => {
        if (patient) {
            getDiagnosis(patientId);
        }
    }, [patient]);

    const patientName = patient ? patient.Name : '';
    const firstName = patient ? patient.Name : '';
    const lastName = patient ? patient.Lastname : '';
    const age = patient ? new Date().getFullYear() - new Date(patient.Birthdate).getFullYear() : null;
    const gender = patient ? patient.Gender : '';
    const birthdate = patient ? patient.Birthdate : '';

    const firstNameContact = 'Eric';
    const lastNameContact = 'Doe';
    const emailContact = 'eric_doe@gmail.com';
    const telephoneContact = '0612345678';

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingContact, setIsEditingContact] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        sendDataToBackend();
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleEditContactClick = () => {
        setIsEditingContact(true);
    };

    const handleSaveContactClick = () => {
        setIsEditingContact(false);
    };

    const handleCancelContactClick = () => {
        setIsEditingContact(false);
    };

    const handleEditMedicationClick = (id) => {
        setMedications(medications.map(medication => medication.id === id ? { ...medication, isEditing: true } : medication));
    };

    const handleSaveMedicationClick = (id) => {
        setMedications(medications.map(medication => medication.id === id ? { ...medication, isEditing: false } : medication));
    };

    const handleCancelMedicationClick = (id) => {
        setMedications(medications.map(medication => medication.id === id ? { ...medication, isEditing: false } : medication));
    };

    const sendDataToBackend = () => {
        const editedData = {
            // Gather edited data here
        };

        fetch('/update_patient/<int:patient_id>', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send data to the server');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data successfully sent to the server:', data);
        })
        .catch(error => {
            console.error('Error sending data to the server:', error);
        });
    };

    return (
        <>
            <Navbar />
            <TopPage headerName="Patiënt" patientId={patientId} imageSrc={imageSrc} />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <span>Patiënt informatie</span>
                                {isEditing ? (
                                    <>
                                        <button className="btn btn-outline-primary" onClick={handleSaveClick}><i className="bi bi-check-circle"></i></button>
                                        <button className="btn btn-outline-primary" onClick={handleCancelClick}><i className="bi bi-x-circle"></i></button>
                                    </>
                                ) : (
                                    <button className="btn btn-outline-primary" onClick={handleEditClick}><i className="bi bi-pencil-square"></i></button>
                                )}
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Naam</label>
                                    {isEditing ? <input type="text" className="form-control" defaultValue={lastName} /> : <p className="form-control-plaintext">{lastName}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Voornaam</label>
                                    {isEditing ? <input type="text" className="form-control" defaultValue={firstName} /> : <p className="form-control-plaintext">{firstName}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Leeftijd</label>
                                    {isEditing ? <input type="text" className="form-control" defaultValue={age} /> : <p className="form-control-plaintext">{age}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Geslacht</label>
                                    {isEditing ? <input type="text" className="form-control" defaultValue={gender} /> : <p className="form-control-plaintext">{gender}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Diagnose</label>
                                    {isEditing ? (
                                        diagnosis.map((diag, index) => (
                                            <input key={index} type="text" className="form-control mb-2" defaultValue={diag.Diagnosis} />
                                        ))
                                    ) : (
                                        <p className="form-control-plaintext">{diagnosis.map(diag => diag.Diagnosis).join(', ')}</p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Geboortedatum</label>
                                    {isEditing ? <input type="text" className="form-control" defaultValue={birthdate} /> : <p className="form-control-plaintext">{birthdate}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <span>Contact informatie</span>
                                {isEditingContact ? (
                                    <>
                                        <button className="btn btn-outline-primary" onClick={handleSaveContactClick}><i className="bi bi-check-circle"></i></button>
                                        <button className="btn btn-outline-primary" onClick={handleCancelContactClick}><i className="bi bi-x-circle"></i></button>
                                    </>
                                ) : (
                                    <button className="btn btn-outline-primary" onClick={handleEditContactClick}><i className="bi bi-pencil-square"></i></button>
                                )}
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Naam</label>
                                    {isEditingContact ? <input type="text" className="form-control" defaultValue={lastNameContact} /> : <p className="form-control-plaintext">{lastNameContact}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Voornaam</label>
                                    {isEditingContact ? <input type="text" className="form-control" defaultValue={firstNameContact} /> : <p className="form-control-plaintext">{firstNameContact}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Telefoonnummer</label>
                                    {isEditingContact ? <input type="text" className="form-control" defaultValue={telephoneContact} /> : <p className="form-control-plaintext">{telephoneContact}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Emailadres</label>
                                    {isEditingContact ? <input type="text" className="form-control" defaultValue={emailContact} /> : <p className="form-control-plaintext">{emailContact}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {medications.map((medication, index) => (
                        <div key={index} className="col-lg-6 mb-4">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <span>Behandeling</span>
                                    {medication.isEditing ? (
                                        <>
                                            <button className="btn btn-outline-primary" onClick={() => handleSaveMedicationClick(medication.id)}><i className="bi bi-check-circle"></i></button>
                                            <button className="btn btn-outline-primary" onClick={() => handleCancelMedicationClick(medication.id)}><i className="bi bi-x-circle"></i></button>
                                        </>
                                    ) : (
                                        <button className="btn btn-outline-primary" onClick={() => handleEditMedicationClick(medication.id)}><i className="bi bi-pencil-square"></i></button>
                                    )}
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Medicijn</label>
                                        {medication.isEditing ? <input type="text" className="form-control" defaultValue={medication.Name} /> : <p className="form-control-plaintext">{medication.Name}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Gebruik</label>
                                        {medication.isEditing ? <input type="text" className="form-control" defaultValue={medication.Dose} /> : <p className="form-control-plaintext">{medication.Dose}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Frequentie</label>
                                        {medication.isEditing ? <input type="text" className="form-control" defaultValue={medication.Frequency} /> : <p className="form-control-plaintext">{medication.Frequency}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PatientSettingsPage;
