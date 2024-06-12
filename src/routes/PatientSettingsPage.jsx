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
                    "Contactperson_name": patientData.Contactperson_name,
                    "Contactperson_lastname": patientData.Contactperson_lastname,
                    "Contactperson_email": patientData.Contactperson_email,
                    "Contactperson_phone_number": patientData.Contactperson_phone_number
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

    useEffect(() => {
        setPatientName(patient ? patient.Name : '');
        setFirstName(patient ? patient.Name : '');
        setLastName(patient ? patient.Lastname : '');
        setAge(patient ? patient.Age : null);
        setGender(patient ? patient.Gender : '');
        setBirthdate(patient ? new Date(patient.Birthdate).toDateString() : '');
        setEmail(patient ? patient.Email : '');
        setPhoneNumber(patient ? patient.Phone_number : '');
        setFirstNameContact(patient ? patient.Contactperson_name : '');
        setLastNameContact(patient ? patient.Contactperson_lastname : '');
        setEmailContact(patient ? patient.Contactperson_email : '');
        setPhoneNumberContact(patient ? patient.Contactperson_phone_number : '');
    }, [patient]);

    // Starting values for the patient data
    const [patientName, setPatientName] = useState(patient ? patient.Name : '');
    const [firstName, setFirstName] = useState(patient ? patient.Name : '');
    const [lastName, setLastName] = useState(patient ? patient.Lastname : '');
    const [age, setAge] = useState(patient ? patient.Age : null);
    const [gender, setGender] = useState(patient ? patient.Gender : '');
    const [birthdate, setBirthdate] = useState(patient ? new Date(patient.Birthdate).toDateString() : '');
    const [email, setEmail] = useState(patient ? patient.Email : '');
    const [phone_number, setPhoneNumber] = useState(patient ? patient.Phone_number : '');
    const [firstNameContact, setFirstNameContact] = useState(patient ? patient.Contactperson_name : '');
    const [lastNameContact, setLastNameContact] = useState(patient ? patient.Contactperson_lastname : '');
    const [emailContact, setEmailContact] = useState(patient ? patient.Contactperson_email : '');
    const [phoneNumberContact, setPhoneNumberContact] = useState(patient ? patient.Contactperson_phone_number : '');

    // All of the editable values
    // Patientgegevens
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedGender, setEditedGender] = useState('');
    const [editedBirthdate, setEditedBirthdate] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    // Contactpersoon
    const [editedFirstNameContact, setEditedFirstNameContact] = useState('');
    const [editedLastNameContact, setEditedLastNameContact] = useState('');
    const [editedEmailContact, setEditedEmailContact] = useState('');
    const [editedPhoneNumberContact, setEditedPhoneNumberContact] = useState('');

    // General state for editing
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingMedicationId, setDeletingMedicationId] = useState(null);

    //----------------------------------------------------------------//
    //-------Logic for handling UI-patient changes upon editing-------//
    //----------------------------------------------------------------//

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedFirstName(patient.Name);  // Copy current value to local state
        setEditedLastName(patient.Lastname);
        setEditedGender(patient.Gender);
        setEditedBirthdate(patient ? new Date(patient.Birthdate).toDateString() : '');
        setEditedPhoneNumber(patient.Phone_number);
        setEditedEmail(patient.Email);

    };

    const handleSaveClick = () => {
        // Save changes here
        setIsEditing(false);
        sendPatientDataToBackend();

        setFirstName(editedFirstName);
        setLastName(editedLastName);
        setGender(editedGender);
        setBirthdate(editedBirthdate);
        setPhoneNumber(editedPhoneNumber);
        setEmail(editedEmail);

    };

    const handleCancelClick = () => {
        // Revert changes here
        setIsEditing(false);
    };

    //----------------------------------------------------------------------//
    //-------Logic for handling UI-contactperson changes upon editing-------//
    //----------------------------------------------------------------------//

    const [isEditingContact, setIsEditingContact] = useState(false);

    const handleEditContactClick = () => {
        setIsEditingContact(true);
        setEditedFirstNameContact(patient.Contactperson_name);  // Copy current value to local state
        setEditedLastNameContact(patient.Contactperson_lastname);
        setEditedEmailContact(patient.Contactperson_email);
        setEditedPhoneNumberContact(patient.Contactperson_phone_number);

    };

    const handleSaveContactClick = () => {
        // Save changes here
        setIsEditingContact(false);
        sendPatientDataToBackend();

        setFirstNameContact(editedFirstNameContact);
        setLastNameContact(editedLastNameContact);
        setEmailContact(editedEmailContact);
        setPhoneNumberContact(editedPhoneNumberContact);
    };

    const handleCancelContactClick = () => {
        // Revert changes here
        setIsEditingContact(false);
    };

    //----------------------------------------------------------------------//
    //-------Logic for handling UI-medication changes upon editing----------//
    //----------------------------------------------------------------------//

    // Function to handle edit click
    const handleEditMedicationClick = (id) => {
        setMedications(medications.map(medication => {
            if (medication.Id === id) {
                return { ...medication, isEditing: true };
            }
            return medication;
        }));
    };

    // Function to handle cancel click
    const handleCancelMedicationClick = (id) => {
        setMedications(medications.map(medication => {
            if (medication.Id === id) {
                return { ...medication, isEditing: false };
            }
            return medication;
        }));
    };

    // handleSaveMedicationClick method
    const handleSaveMedicationClick = (medicationId) => {
        const medication = medications.find(m => m.Id === medicationId);
        if (!medication) {
            console.error('Medication not found');
            return;
        }

        const editedMedicationData = {
            Name: medication.Name,
            Dose: medication.Dose, // Ensure these field names match your backend expectations
            Start_date: medication.Start_date,
            Frequency: medication.Frequency,
        };

        if (medication.Id < 0) {
            addNewMedication(patientId, editedMedicationData, medication.Id);
        } else {
            sendMedicationDataToBackend(patientId, medication.Id, editedMedicationData);
        }

        // After sending data to backend, update local state as necessary
        setMedications(medications.map(m => {
            if (m.Id === medicationId) {
                return { ...m, isEditing: false };
            }
            return m;
        }));
    };

    // Function to handle input change
    const handleInputChange = (id, field, value) => {
        setMedications(medications.map(medication => {
            if (medication.Id === id) {
                return { ...medication, [field]: value };
            }
            return medication;
        }));
    };

    const handleAddNewMedication = () => {
        const tempId = -1 * (new Date()).getTime(); // Example of a temporary ID

        const newMedication = {
            Id: tempId,
            Name: '', // Default empty value
            Dose: '', // Default empty value
            Frequency: '', // Default empty value
            Start_date: '', // Default empty value
            isEditing: true, // To open in edit mode directly
        };
        setMedications([...medications, newMedication]);
    };

    const updateMedicationId = (temporaryId, newId) => {
        setMedications(currentMedications =>
            currentMedications.map(medication =>
                medication.Id === temporaryId ? { ...medication, Id: newId } : medication
            )
        );
    };

    const handleDeleteButtonClick = (id) => {
        setMedications(medications.map(medication => {
            if (medication.Id === id) {
                return { ...medication, isDeleting: true };
            }
            return medication;
        }));
    };

    // Confirm delete handler
    const confirmDelete = () => {
        // Implement deletion logic here
        // After deletion, reset the state
        setShowDeleteConfirmation(false);
        setDeletingMedicationId(null);
        // Possibly refresh the list of medications or remove the deleted item from state
    };

    // Cancel delete handler
    const cancelDelete = () => {
        // Simply reset the state without deleting
        setShowDeleteConfirmation(false);
        setDeletingMedicationId(null);
    };

    //----------------------------------------------------------------------//
    //-------Logic for handling UI-diagnosis changes upon editing----------//
    //----------------------------------------------------------------------//

    // Function to handle edit click for diagnosis
    const handleEditDiagnosisClick = (id) => {
        setDiagnosis(diagnosis.map(diag => {
            if (diag.Id === id) {
                return { ...diag, isEditing: true };
            }
            return diag;
        }));
    };

    // Function to handle cancel click for diagnosis
    const handleCancelDiagnosisClick = (id) => {
        setDiagnosis(diagnosis.map(diag => {
            if (diag.Id === id) {
                return { ...diag, isEditing: false };
            }
            return diag;
        }));
    };

    // handleSaveDiagnosisClick method
    const handleSaveDiagnosisClick = (diagnosisId) => {
        const diag = diagnosis.find(d => d.Id === diagnosisId);
        if (!diag) {
            console.error('Diagnosis not found');
            return;
        }

        const editedDiagnosisData = {
            DoctorId: diag.DoctorId,
            Diagnosis: diag.Diagnosis,
            Description: diag.Description,
            Date: diag.Date,
        };

        sendDiagnosisDataToBackend(patientId, diagnosisId, editedDiagnosisData);

        // After sending data to backend, update local state as necessary
        setDiagnosis(diagnosis.map(d => {
            if (d.Id === diagnosisId) {
                return { ...d, isEditing: false };
            }
            return d;
        }));
    };

    // Function to handle input change for diagnosis
    const handleInputChangeForDiagnosis = (id, field, value) => {
        setDiagnosis(diagnosis.map(diag => {
            if (diag.Id === id) {
                return { ...diag, [field]: value };
            }
            return diag;
        }));
    };







    //----------------------------------------------------------------------//
    //----------------Logic for updating changes upon saving----------------//
    //----------------------------------------------------------------------//

    // Function to send edited data to the backend
    const sendPatientDataToBackend = () => {
        const editedData = {
            // Patientgegevens
            Name: editedFirstName,
            Lastname: editedLastName,
            Gender: editedGender,
            Birthdate: editedBirthdate,
            Phone_number: editedPhoneNumber,
            Email: editedEmail,

            // Contactpersoon
            Contactperson_name: editedFirstNameContact,
            Contactperson_lastname: editedLastNameContact,
            Contactperson_email: editedEmailContact,
            Contactperson_phone_number: editedPhoneNumberContact
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
    };

    // Modified sendMedicationDataToBackend function
    const sendMedicationDataToBackend = (patientId, medicationId, editedMedicationData) => {
        fetch(`http://localhost:5000/patients/${patientId}/medication/${medicationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedMedicationData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update medication data');
                }
                return response.json();
            })
            .then(data => {
                console.log('Medication data successfully updated:', data);
                // Optionally, refresh the medication list or indicate success to the user
            })
            .catch(error => {
                console.error('Error updating medication data:', error);
                // Optionally, indicate error to the user
            });
    };

    const addNewMedication = (patientId, newMedicationData, tempId) => {
        // Function to send new medication data to the backend
        // Ensure newMedicationData contains 'name', 'dosage', 'start_date', and 'frequency' as required by the backend
        fetch(`http://localhost:5000/patients/${patientId}/medication`, { // Updated endpoint to match Flask route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMedicationData),
        })
            .then(response => {
                if (!response.ok) {
                    // If the response status code is not in the 200-299 range,
                    // throw an error to catch it in the subsequent catch block
                    throw new Error('Failed to add new medication');
                }
                return response.json();
            })
            .then(data => {
                if (data.newId) {
                    // Assuming you have a way to find and update the medication in your state,
                    // for example, by using its temporary negative ID or another identifier
                    updateMedicationId(tempId, data.newId);
                }
                // Handle the response from the backend
                console.log('New medication added:', data);
                // You can update the state or perform any other actions here
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error adding new medication:', error);
            });
    };

    const sendDiagnosisDataToBackend = (patientId, diagnosisId, editedDiagnosisData) => {
        fetch(`http://localhost:5000/patients/${patientId}/diagnosis/${diagnosisId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedDiagnosisData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update diagnosis data');
                }
                return response.json();
            })
            .then(data => {
                console.log('Diagnosis data successfully updated:', data);
                // Optionally, refresh the diagnosis list or indicate success to the user
            })
            .catch(error => {
                console.error('Error updating diagnosis data:', error);
                // Optionally, indicate error to the user
            });
    };

    return (
        <>
            <Navbar />
            <TopPage headerName="Patientgegevens" patientId={patientId} imageSrc={imageSrc} />
            <div className="content">
                <div className="patient-information">
                    <div className="patient-card card">
                        <div className="card-buttons">
                            <p>Patientgegevens</p>
                            {isEditing ? (
                                <>
                                    <div>
                                        <button onClick={handleSaveClick}><i className="bi bi-check-circle"></i></button>
                                        <button onClick={handleCancelClick}><i className="bi bi-x-circle"></i></button>
                                    </div>
                                </>
                            ) : (
                                <button onClick={handleEditClick}><i className="bi bi-pencil-square"></i></button>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Achternaam</p>
                            {isEditing ? (
                                <input type="text" value={editedLastName} onChange={(e) => setEditedLastName(e.target.value)} />
                            ) : (
                                <p>{lastName}</p>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Voornaam</p>
                            {isEditing ? (
                                <input type="text" value={editedFirstName} onChange={(e) => setEditedFirstName(e.target.value)} />
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
                                <input type="text" value={editedGender} onChange={(e) => setEditedGender(e.target.value)} />
                            ) : (
                                <p>{gender}</p>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Diagnose(s)</p>
                            <p>{Array.isArray(diagnosis) ? diagnosis.map(d => d.Diagnosis).join(', ') : ''}</p>
                        </div>
                        <div className="patient-data-row">
                            <p>Geboortedatum</p>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={editedBirthdate ? new Date(editedBirthdate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setEditedBirthdate(e.target.value)}
                                />
                            ) : (
                                <p>{birthdate ? new Date(birthdate).toDateString() : ''}</p>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Telefoonnummer</p>
                            {isEditing ? (
                                <input type="text" value={editedPhoneNumber} onChange={(e) => setEditedPhoneNumber(e.target.value)} />
                            ) : (
                                <p>{phone_number}</p>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Emailadres</p>
                            {isEditing ? (
                                <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                            ) : (
                                <p>{email}</p>
                            )}
                        </div>
                    </div>
                    <div className="contactperson-card card">
                        <div className="card-buttons">
                            <p>Contactpersoon</p>
                            {isEditingContact ? (
                                <>
                                    <div>
                                        <button onClick={handleSaveContactClick}><i className="bi bi-check-circle"></i></button>
                                        <button onClick={handleCancelContactClick}><i className="bi bi-x-circle"></i></button>
                                    </div>
                                </>
                            ) : (
                                <button onClick={handleEditContactClick}><i className="bi bi-pencil-square"></i></button>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Naam</p>
                            {isEditingContact ? (
                                <input
                                    type="text"
                                    value={editedLastNameContact}
                                    onChange={(e) => setEditedLastNameContact(e.target.value)}
                                />
                            ) : (
                                <p>{lastNameContact}</p>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Voornaam</p>
                            {isEditingContact ? (
                                <input
                                    type="text"
                                    value={editedFirstNameContact}
                                    onChange={(e) => setEditedFirstNameContact(e.target.value)}
                                />
                            ) : (
                                <p>{firstNameContact}</p>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Email</p>
                            {isEditingContact ? (
                                <input
                                    type="text"
                                    value={editedEmailContact}
                                    onChange={(e) => setEditedEmailContact(e.target.value)}
                                />
                            ) : (
                                <p>{emailContact}</p>
                            )}
                        </div>
                        <div className="patient-data-row">
                            <p>Telefoonnummer</p>
                            {isEditingContact ? (
                                <input
                                    type="text"
                                    value={editedPhoneNumberContact}
                                    onChange={(e) => setEditedPhoneNumberContact(e.target.value)}
                                />
                            ) : (
                                <p>{phoneNumberContact}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="medication-cards-container">
                    {
                        Array.isArray(medications) && medications.length > 0 ? (
                            medications.map((medication, index) => (
                                <div key={index} className="medication-card medication card">
                                    <div className="card-buttons">
                                        <p>Medicatie</p>
                                        <div key={medication.Id}>
                                            {medication.isEditing ? (
                                                <>
                                                    <div>
                                                        <button onClick={() => handleSaveMedicationClick(medication.Id)}><i className="bi bi-check-circle"></i></button>
                                                        <button onClick={() => handleCancelMedicationClick(medication.Id)}><i className="bi bi-x-circle"></i></button>
                                                    </div>
                                                </>
                                            ) : medication.isDeleting ? (
                                                <>
                                                    <button onClick={() => confirmDelete(medication.Id)}><i className="bi bi-check-circle"></i></button>
                                                    <button onClick={() => cancelDelete(medication.Id)}><i className="bi bi-x-circle"></i></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditMedicationClick(medication.Id)}><i className="bi bi-pencil-square"></i></button>
                                                    <button onClick={() => handleDeleteButtonClick(medication.Id)}><i className="bi bi-trash"></i></button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="patient-data-row">
                                        <p>Medicijn</p>
                                        {medication.isEditing ? (
                                            <input type="text" value={medication.Name} onChange={(e) => handleInputChange(medication.Id, 'Name', e.target.value)} />
                                        ) : (
                                            <p>{medication.Name}</p>
                                        )}
                                    </div>
                                    <div className="patient-data-row">
                                        <p>Gebruik</p>
                                        {medication.isEditing ? (
                                            <input type="text" value={medication.Dose} onChange={(e) => handleInputChange(medication.Id, 'Dose', e.target.value)} />
                                        ) : (
                                            <p>{medication.Dose}</p>
                                        )}
                                    </div>
                                    <div className="patient-data-row">
                                        <p>Frequentie</p>
                                        {medication.isEditing ? (
                                            <input type="text" value={medication.Frequency} onChange={(e) => handleInputChange(medication.Id, 'Frequency', e.target.value)} />
                                        ) : (
                                            <p>{medication.Frequency}</p>
                                        )}
                                    </div>
                                    <div className="patient-data-row">
                                        <p>Startdatum</p>
                                        {medication.isEditing ? (
                                            <input
                                                type="date"
                                                value={medication.Start_date ? new Date(medication.Start_date).toISOString().split('T')[0] : ''}
                                                onChange={(e) => handleInputChange(medication.Id, 'Start_date', e.target.value)}
                                            />
                                        ) : (
                                            <p>{medication.Start_date ? new Date(medication.Start_date).toDateString() : ''}</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : null}
                    <div className="medication-card placeholder-card card medication" onClick={handleAddNewMedication}>
                        <i className="bi bi-plus"></i>
                    </div>
                </div>
                <div className="diagnosis-cards-container">
                    {
                        Array.isArray(diagnosis) && diagnosis.length > 0 ? (
                            diagnosis.map((diag, index) => (
                                <div key={index} className="diagnosis-card card">
                                    <div className="card-buttons">
                                        <p>Diagnose</p>
                                        {diag.isEditing ? (
                                            <>
                                                <div>
                                                    <button onClick={() => handleSaveDiagnosisClick(diag.Id)}><i className="bi bi-check-circle"></i></button>
                                                    <button onClick={() => handleCancelDiagnosisClick(diag.Id)}><i className="bi bi-x-circle"></i></button>
                                                </div>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEditDiagnosisClick(diag.Id)}><i className="bi bi-pencil-square"></i></button>
                                        )}
                                    </div>
                                    <div className="patient-data-row">
                                        <p>Dokter ID</p>
                                        {diag.isEditing ? (
                                            <input type="text" value={diag.DoctorId} onChange={(e) => handleInputChangeForDiagnosis(diag.Id, 'DoctorId', e.target.value)} />
                                        ) : (
                                            <p>{diag.DoctorId}</p>
                                        )}
                                    </div>
                                    <div className="patient-data-row">
                                        <p>Diagnose</p>
                                        {diag.isEditing ? (
                                            <input type="text" value={diag.Diagnosis} onChange={(e) => handleInputChangeForDiagnosis(diag.Id, 'Diagnosis', e.target.value)} />
                                        ) : (
                                            <p>{diag.Diagnosis}</p>
                                        )}
                                    </div>
                                    <div className="patient-data-row">
                                        <p>Beschrijving</p>
                                        {diag.isEditing ? (
                                            <input type="text" value={diag.Description} onChange={(e) => handleInputChangeForDiagnosis(diag.Id, 'Description', e.target.value)} />
                                        ) : (
                                            <p>{diag.Description}</p>
                                        )}
                                    </div>
                                    <div className="patient-data-row">
                                        <p>Datum</p>
                                        {diag.isEditing ? (
                                            <input
                                                type="date"
                                                value={diag.Date ? new Date(diag.Date).toISOString().split('T')[0] : ''}
                                                onChange={(e) => handleInputChangeForDiagnosis(diag.Id, 'Date', e.target.value)}
                                            />
                                        ) : (
                                            <p>{diag.Date ? new Date(diag.Date).toDateString() : ''}</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : null}
                    <div className="diagnosis-card placeholder-card card">
                        <i className="bi bi-plus"></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientSettingsPage;