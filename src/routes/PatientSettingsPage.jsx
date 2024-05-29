import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PatientSettingsPage = () => {
    const imageSrc = '../src/assets/kid_1.png';
    const patientName = 'John Doe';

    //patient
    const firstName = 'John';
    const lastName = 'Doe';
    const age = 5;
    const gender = "Male";
    const diagnosis = "JDM";
    const birthdate = '14/03/2019';

    //contactpersoon
    const firstNameContact = 'Eric';
    const lastNameContact = 'Doe';
    const emailContact = 'eric_doe@gmail.com';
    const telephoneContact = '0612345678';

    //medicine
    const medicine = "Paracetamol";
    const use = "50mg";
    const frequency = "3 keer per week";

    const [medications, setMedications] = useState([
        { id: 1, medicine: "Paracetamol", use: "50mg", frequency: "3 keer per week", isEditing: false },
        { id: 2, medicine: "Ibuprofen", use: "200mg", frequency: "2 keer per dag", isEditing: false },
        { id: 3, medicine: "Ibuprofen", use: "200mg", frequency: "2 keer per dag", isEditing: false },
        { id: 4, medicine: "Ibuprofen", use: "200mg", frequency: "2 keer per dag", isEditing: false },
        // Add more medication objects here...
    ]);

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
            <div className="top-page">
                <h1>Patientgegevens</h1>
                <p>This is the content of the home page.</p>
                <div className="patient-data-block">
                    <h3 className="patient-name-results">{patientName}</h3>
                    <img className="patient-image-results" src={imageSrc} alt="patient" />
                </div>
            </div>
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
                    <div key={index} className="medication-card card">
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
                        <div className="patient-data-row"><p>Medicijn</p>{medication.isEditing ? <input type="text" defaultValue={medication.medicine} /> : <p>{medication.medicine}</p>}</div>
                        <div className="patient-data-row"><p>Gebruik</p>{medication.isEditing ? <input type="text" defaultValue={medication.use} /> : <p>{medication.use}</p>}</div>
                        <div className="patient-data-row"><p>Frequentie</p>{medication.isEditing ? <input type="text" defaultValue={medication.frequency} /> : <p>{medication.frequency}</p>}</div>
                    </div>
                ))}
                </div>

            </div>
        </>
    );
};

export default PatientSettingsPage;