import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';

const PatientSettingsPage = () => {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [diagnosis, setDiagnosis] = useState([]);
    const [medications, setMedications] = useState([]);
    

    //----------------------------------------------------------------//
    //-------------API calls to get all the neccessary data-----------//
    //----------------------------------------------------------------//

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
            setDiagnosis(data); // set the entire data array to the diagnosis state
        } catch (error) {
            console.error('Error fetching diagnoses:', error);
        }
    };


    
    //---------------------------------------------------------------------------//
    //-------Initiating loading Diagnosis and Medication if patient exists-------//
    //---------------------------------------------------------------------------//

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

    //Static start values to fill the page
    const patientName = patient ? patient.Name : '';
    const firstName = patient ? patient.Name : '';
    const lastName = patient ? patient.Lastname : '';
    const age = patient ? patient.Age : null;
    const gender = patient ? patient.Gender : '';
    const birthdate = patient ? patient.Birthdate : '';
    const Email = patient ? patient.Email : '';
    const Phone_number = patient ? patient.Phone_number : '';
    const firstNameContact = 'Eric';
    const lastNameContact = 'Doe';
    const emailContact = 'eric_doe@gmail.com';
    const telephoneContact = '0612345678';

    // All of the editable values
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedGender, setEditedGender] = useState('');
    const [editedDiagnosis, setEditedDiagnosis] = useState([]);
    const [editedBirthdate, setEditedBirthdate] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    //----------------------------------------------------------------//
    //-------Logic for handling UI-patient changes upon editing-------//
    //----------------------------------------------------------------//

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedFirstName(patient.Name);  // Copy current value to local state
        setEditedLastName(patient.Lastname);
        setEditedGender(patient.Gender);
        setEditedBirthdate(patient.Birthdate);
        setEditedPhoneNumber(patient.Phone_number);
        setEditedEmail(patient.Email);
    };

    const handleSaveClick = () => {
        // Save changes here
        setIsEditing(false);
        sendDataToBackend();
    };

    const handleCancelClick = () => {
        // Revert changes here
        setIsEditing(false);
    };

    //--------------------------------------------------------//
    //--------All of the handle input field functions---------//
    //--------------------------------------------------------//

    const handleFirstNameChange = (event) => {
        setEditedFirstName(event.target.value);  // Update local state when user types
    };

    const handleLastNameChange = (event) => {
        setEditedLastName(event.target.value);
    };

    const handleGenderChange = (event) => {
        setEditedGender(event.target.value);
    };
    
    const handleDiagnosisChange = (e) => {
        const newDiagnosis = e.target.value.split(',').map(d => d.trim());
        setEditedDiagnosis(newDiagnosis); // Assuming you have a state variable named editedDiagnosis
    };

    const handleBirthdateChange = (event) => {
        setEditedBirthdate(event.target.value);
    };
    
    const handlePhoneNumberChange = (event) => {
        setEditedPhoneNumber(event.target.value);
    };
    
    const handleEmailChange = (event) => {
        setEditedEmail(event.target.value);
    };
    
    //----------------------------------------------------------------------//
    //-------Logic for handling UI-contactperson changes upon editing-------//
    //----------------------------------------------------------------------//

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

    //----------------------------------------------------------------------//
    //-------Logic for handling UI-medication changes upon editing----------//
    //----------------------------------------------------------------------//

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

    //----------------------------------------------------------------------//
    //----------------Logic for updating changes upon saving----------------//
    //----------------------------------------------------------------------//

    const updateDiagnosis = (patientId, diagnosisId, diagnosisDetails) => {
        const apiUrl = `http://localhost:5000/patients/${patientId}/diagnosis/${diagnosisId}`;
    
        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(diagnosisDetails),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update diagnosis');
            }
            return response.json();
        })
        .then(data => {
            console.log('Diagnosis updated successfully:', data);
            // Update UI or state as needed
        })
        .catch(error => {
            console.error('Error updating diagnosis:', error);
            // Handle error, possibly by showing a message to the user
        });
    };

    // Function to send edited data to the backend
    const sendDataToBackend = () => {
        const editedData = {
            Name: editedFirstName,
            Lastname: editedLastName,
            Gender: editedGender,
            Birthdate: editedBirthdate,
            Phone_number: editedPhoneNumber,
            Email: editedEmail,
        };

        fetch(`http://localhost:5000/update_patient/${patientId}`, {
            method: 'PUT',
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
            // Handle response from backend if needed
        })
        .catch(error => {
            console.error('Error sending data to the server:', error);
            // Handle error if needed
        });

       updateDiagnosis(patientId, diagnosisId, diagnosisDetails);
    };


    return (
        <>
            <Navbar />
            <TopPage headerName="Patientgegevens" patientId={patientId} imageSrc={imageSrc} />
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
                        <div className="patient-data-row">
                            <p>Achternaam</p>
                            {isEditing ? (
                                <input type="text" value={editedLastName} onChange={handleLastNameChange} />
                            ) : (
                                <p>{lastName}</p>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Voornaam</p>
                            {isEditing ? (
                                <input type="text" value={editedFirstName} onChange={handleFirstNameChange} />
                            ) : (
                                <p>{firstName}</p>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Leeftijd</p>
                            <p>{new Date().getFullYear() - new Date(birthdate).getFullYear()}</p>
                        </div>
                        <div className="patient-data-row">
                            <p>Geslacht</p>
                            {isEditing ? (
                                <input type="text" value={editedGender} onChange={handleGenderChange} />
                            ) : (
                                <p>{gender}</p>
                            )}
                        </div>
                        <div className="patient-data-row">
                        <p>Diagnose</p>
                        {isEditing ? (
                            <input
                                type="text"
                                value={Array.isArray(diagnosis) ? diagnosis.map(d => d.Diagnosis).join(', ') : ''}
                                onChange={(e) => {
                                    const newInputValue = e.target.value;
                                    const newDiagnoses = newInputValue.split(',').map(d => d.trim());
                                    
                                    const currentDiagnoses = diagnosis.map(d => d.Diagnosis);

                                    // Find added diagnoses
                                    const addedDiagnoses = newDiagnoses.filter(d => !currentDiagnoses.includes(d));

                                    // Find removed diagnoses
                                    const removedDiagnoses = currentDiagnoses.filter(d => !newDiagnoses.includes(d));

                                    // Update the diagnosis state to reflect the new input
                                    const updatedDiagnosis = newDiagnoses.map(d => ({ Diagnosis: d }));
                                    setDiagnosis(updatedDiagnosis);

                                    // Optionally, handle added/removed diagnoses here (e.g., updating the database)
                                    // This could involve sending requests to your backend to update the patient's record
                                    // based on addedDiagnoses and removedDiagnoses.
                                }}
                            />
                        ) : (
                            <p>{Array.isArray(diagnosis) ? diagnosis.map(diag => diag.Diagnosis).join(', ') : ''}</p>
                        )}
                        </div>
                        <div className="patient-data-row">
                            <p>Geboortedatum</p>
                            {isEditing ? (
                                <input type="text" value={editedBirthdate} onChange={handleBirthdateChange} />
                            ) : (
                                <p>{birthdate}</p>
                            )}
                        </div>                        
                        <div className="patient-data-row">
                            <p>Telefoonnummer</p>
                            {isEditing ? (
                                <input type="text" value={editedPhoneNumber} onChange={handlePhoneNumberChange} />
                            ) : (
                                <p>{Phone_number}</p>
                            )}
                        </div>                        
                        <div className="patient-data-row">
                            <p>Emailadres</p>
                            {isEditing ? (
                                <input type="text" value={editedEmail} onChange={handleEmailChange} />
                            ) : (
                                <p>{Email}</p>
                            )}
                        </div>                    
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
                {
                    Array.isArray(medications) && medications.length > 0 ? (
                        medications.map((medication, index) => (
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
                                <div className="patient-data-row"><p>Gebruik</p>{medication.isEditing ? <input type="text" defaultValue={medication.Dose} /> : <p>{medication.Dose}</p>}</div>
                                <div className="patient-data-row"><p>Frequentie</p>{medication.isEditing ? <input type="text" defaultValue={medication.Frequency} /> : <p>{medication.Frequency}</p>}</div>
                            </div>
                        ))
                    ) : null}
                    <div className="medication-card placeholder-card card medication">
                        <i className="bi bi-plus"></i>
                    </div>
                </div>
                <div className="diagnosis-cards-container">
                {Array.isArray(diagnosis) && diagnosis.length > 0 && diagnosis.map((diag, index) => (
                    <div key={index} className="diagnosis-card card">
                        <div className="card-buttons">
                                {diag.isEditing ? (
                                    <>
                                        <button onClick={() => handleSaveDiagnosisClick(diag.Id)}><i className="bi bi-check-circle"></i></button>
                                        <button onClick={() => handleCancelDiagnosisClick(diag.Id)}><i className="bi bi-x-circle"></i></button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEditDiagnosisClick(diag.Id)}><i className="bi bi-pencil-square"></i></button>
                                )}
                            </div>
                            <div className="patient-data-row"><p>Dokter ID</p>{diag.isEditing ? <input type="text" defaultValue={diag.DoctorId} /> : <p>{diag.DoctorId}</p>}</div>
                            <div className="patient-data-row"><p>Diagnose</p>{diag.isEditing ? <input type="text" defaultValue={diag.Diagnosis} /> : <p>{diag.Diagnosis}</p>}</div>
                            <div className="patient-data-row"><p>Beschrijving</p>{diag.isEditing ? <input type="text" defaultValue={diag.Description} /> : <p>{diag.Description}</p>}</div>
                            <div className="patient-data-row"><p>Datum</p>{diag.isEditing ? <input type="text" defaultValue={diag.Date} /> : <p>{diag.Date}</p>}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PatientSettingsPage;