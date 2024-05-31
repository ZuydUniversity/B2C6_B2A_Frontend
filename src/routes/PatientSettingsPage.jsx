import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TopPage from '../components/TopPage';

const PatientSettingsPage = () => {
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

    const [medications, setMedications] = useState([]);

    const getMedication = async (patientId) => {
        try {
            const response = await fetch(`http://localhost:5000/patients/${patientId}/medication`);
            const data = await response.json();
            setMedications(data);
        } catch (error) {
            console.error('Error fetching medication:', error);
        }
    };
    
    // const patient = patients[0];
    const imageSrc = '../src/assets/kid_1.png';
    const patient = patients.length > 0 ? patients[0] : null;

    useEffect(() => {
        if (patient) {
            getMedication(patient.Id);
        }
    }, [patient]);

    const patientName = patient ? patient.Name : '';
    const firstName = patient ? patient.Name : '';
    const lastName = patient ? patient.Lastname : '';
    const age = patient ? patient.Age : null;
    const gender = patient ? patient.Gender : '';
    const diagnosis = patient ? patient.Diagnosis : '';
    const birthdate = patient ? patient.Birthdate : '';

    //contactpersoon
    const firstNameContact = 'Eric';
    const lastNameContact = 'Doe';
    const emailContact = 'eric_doe@gmail.com';
    const telephoneContact = '0612345678';

    //Logic for editing patient data
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Save changes here
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        // Revert changes here
        setIsEditing(false);
    };

    //Logic for editing contact data
    const [isEditingContact, setIsEditingContact] = useState(false);

    const handleEditContactClick = () => {
        setIsEditingContact(true);
    };

    const handleSaveContactClick = () => {
        // Save changes here
        setIsEditingContact(false);
    };

    const handleCancelContactClick = () => {
        // Revert changes here
        setIsEditingContact(false);
    };

    //Logic for editing medication data
    const handleEditMedicationClick = (id) => {
        setMedications(medications.map(medication => medication.id === id ? { ...medication, isEditing: true } : medication));
    };

    const handleSaveMedicationClick = (id) => {
        // Save changes here
        setMedications(medications.map(medication => medication.id === id ? { ...medication, isEditing: false } : medication));
    };

    const handleCancelMedicationClick = (id) => {
        // Revert changes here
        setMedications(medications.map(medication => medication.id === id ? { ...medication, isEditing: false } : medication));
    };



    return (
        <>
            <Navbar />
            <TopPage headerName="Gegevens" patientName={patientName} imageSrc={imageSrc} />
            <div className="content">
                <div className="patient-information">
                    <div className="patient-card card">
                        <div className="card-buttons">
                            {isEditing ? (
                                <>
                                    <button onClick={handleSaveClick}><i className="bi bi-check-circle"></i></button>
                                    <button onClick={handleCancelClick}><i className="bi bi-x-circle"></i></button>
                                </>
                            ) : (
                                <button onClick={handleEditClick}><i className="bi bi-pencil-square"></i></button>
                            )}
                        </div>
                        <div className="patient-data-row"><p>Naam</p>{isEditing ? <input type="text" defaultValue={lastName} /> : <p>{lastName}</p>}</div>
                        <div className="patient-data-row"><p>Voornaam</p>{isEditing ? <input type="text" defaultValue={firstName} /> : <p>{firstName}</p>}</div>
                        <div className="patient-data-row"><p>Leeftijd</p>{isEditing ? <input type="text" defaultValue={age} /> : <p>{age}</p>}</div>
                        <div className="patient-data-row"><p>Geslacht</p>{isEditing ? <input type="text" defaultValue={gender} /> : <p>{gender}</p>}</div>
                        <div className="patient-data-row"><p>Diagnose</p>{isEditing ? <input type="text" defaultValue={diagnosis} /> : <p>{diagnosis}</p>}</div>
                        <div className="patient-data-row"><p>Geboortedatum</p>{isEditing ? <input type="text" defaultValue={birthdate} /> : <p>{birthdate}</p>}</div>
                    </div>

                    <div className="contactperson-card card">
                        <div className="card-buttons">
                            {isEditingContact ? (
                                <>
                                    <button onClick={handleSaveContactClick}><i className="bi bi-check-circle"></i></button>
                                    <button onClick={handleCancelContactClick}><i className="bi bi-x-circle"></i></button>
                                </>
                            ) : (
                                <button onClick={handleEditContactClick}><i className="bi bi-pencil-square"></i></button>
                            )}
                        </div>
                        <div className="patient-data-row"><p>Naam</p>{isEditingContact ? <input type="text" defaultValue={lastNameContact} /> : <p>{lastNameContact}</p>}</div>
                        <div className="patient-data-row"><p>Voornaam</p>{isEditingContact ? <input type="text" defaultValue={firstNameContact} /> : <p>{firstNameContact}</p>}</div>
                        <div className="patient-data-row"><p>Telefoonnummer</p>{isEditingContact ? <input type="text" defaultValue={emailContact} /> : <p>{emailContact}</p>}</div>
                        <div className="patient-data-row"><p>Emailadres</p>{isEditingContact ? <input type="text" defaultValue={telephoneContact} /> : <p>{telephoneContact}</p>}</div>
                    </div>
                </div>
                <div className="medication-cards-container">
                {medications.map((medication, index) => (
                    <div key={index} className="medication-card medication card">
                        <div className="card-buttons">
                            {medication.isEditing ? (
                                <>
                                    <button onClick={() => handleSaveMedicationClick(medication.id)}><i className="bi bi-check-circle"></i></button>
                                    <button onClick={() => handleCancelMedicationClick(medication.id)}><i className="bi bi-x-circle"></i></button>
                                </>
                            ) : (
                                <button onClick={() => handleEditMedicationClick(medication.id)}><i className="bi bi-pencil-square"></i></button>
                            )}
                        </div>
                        <div className="patient-data-row"><p>Medicijn</p>{medication.isEditing ? <input type="text" defaultValue={medication.Name} /> : <p>{medication.Name}</p>}</div>
                        <div className="patient-data-row"><p>Gebruik</p>{medication.isEditing ? <input type="text" defaultValue={medication.Dosis} /> : <p>{medication.Dosis}</p>}</div>
                        <div className="patient-data-row"><p>Frequentie</p>{medication.isEditing ? <input type="text" defaultValue={medication.Frequency} /> : <p>{medication.Frequency}</p>}</div>
                    </div>
                ))}
                    <div className="medication-card placeholder-card card medication">
                        <i class="bi bi-plus"></i>
                    </div>
                </div>
               
            </div>
        </>
    );
};

export default PatientSettingsPage;