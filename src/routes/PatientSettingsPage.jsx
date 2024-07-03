import '../styling/Main.css';
import '../styling/Patientenoverzicht.css';
import { useState, useEffect } from 'react';
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
            if (data.error) {
                console.log('Error in response data:', data.error);
                // Handle the error, e.g., by updating the state to show an appropriate message
                // This could be setting an error state, or a specific message indicating no medications found
            } else {
                setMedications(data);
            }
        } catch (error) {
            console.error('Error fetching medication:', error);
        }
    };
    const getDiagnosis = async (patientId) => {
        console.log(`Fetching diagnosis for patientId: ${patientId}`);
        try {
            const response = await fetch(`http://localhost:5000/patients/${patientId}/diagnosis`);
            const data = await response.json();
            if (data.error) {
                console.log('Error in response data:', data.error);
                // Handle the error, e.g., by updating the state to show an appropriate message
                // This could be setting an error state, or a specific message indicating no diagnoses found
            } else {
                setDiagnosis(data); // set the entire data array to the diagnosis state
            }
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
        setFirstName(patient ? patient.Name : '');
        setLastName(patient ? patient.Lastname : '');
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
    const [firstName, setFirstName] = useState(patient ? patient.Name : '');
    const [lastName, setLastName] = useState(patient ? patient.Lastname : '');
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


    //----------------------------------------------------------------//
    //-------Logic for handling UI-patient changes upon editing-------//
    //----------------------------------------------------------------//

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedFirstName(firstName);  // Copy current value to local state
        setEditedLastName(lastName);
        setEditedGender(gender);
        setEditedBirthdate(birthdate);
        setEditedPhoneNumber(phone_number);
        setEditedEmail(email);

    };

    const handleSaveClick = () => {
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
        setIsEditing(false);
    };

    //----------------------------------------------------------------------//
    //-------Logic for handling UI-contactperson changes upon editing-------//
    //----------------------------------------------------------------------//

    const [isEditingContact, setIsEditingContact] = useState(false);

    const handleEditContactClick = () => {
        setIsEditingContact(true);
        setEditedFirstNameContact(firstNameContact);  // Copy current value to local state
        setEditedLastNameContact(lastNameContact);
        setEditedEmailContact(emailContact);
        setEditedPhoneNumberContact(phoneNumberContact);

    };

    const handleSaveContactClick = () => {
        setIsEditingContact(false);
        sendPatientDataToBackend();

        setFirstNameContact(editedFirstNameContact);
        setLastNameContact(editedLastNameContact);
        setEmailContact(editedEmailContact);
        setPhoneNumberContact(editedPhoneNumberContact);
    };

    const handleCancelContactClick = () => {
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

    const handleCancelMedicationClick = (id) => {
        if (id < 0) {
            // If ID is negative, remove the medication from the list
            setMedications(medications.filter(medication => medication.Id !== id));
        } else {
            // If ID is positive, just set isEditing to false
            setMedications(medications.map(medication => {
                if (medication.Id === id) {
                    return { ...medication, isEditing: false };
                }
                return medication;
            }));
        }
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

    const confirmDelete = async (medicationId) => {
        deleteMedication(patientId, medicationId);
    };

    const cancelDelete = (medicationId) => {
        // Assuming you have a state `medications` that holds all medication items
        setMedications(medications.map(med => {
            if (med.Id === medicationId) {
                return { ...med, isDeleting: false }; // Reset isDeleting for the specific medication
            }
            return med;
        }));
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

    const handleCancelDiagnosisClick = (id) => {
        if (id < 0) {
            // If ID is negative, remove the diagnosis from the list
            setDiagnosis(diagnosis.filter(diag => diag.Id !== id));
        } else {
            // If ID is positive, just set isEditing to false
            setDiagnosis(diagnosis.map(diag => {
                if (diag.Id === id) {
                    return { ...diag, isEditing: false };
                }
                return diag;
            }));
        }
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

        if (diag.Id < 0) {
            addDiagnosis(patientId, editedDiagnosisData, diagnosis.Id);
        } else {
            sendDiagnosisDataToBackend(patientId, diagnosis.Id, editedDiagnosisData);
        }
    
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

    const handleDiagDeleteButtonClick = (id) => {
        setDiagnosis(diagnosis.map(diag => {
            if (diag.Id === id) {
                return { ...diag, isDeleting: true };
            }
            return diag;
        }));
    };

    const confirmDiagDelete = async (diagnosisId) => {
        deleteDiagnosis(patientId, diagnosisId);
    };

    const cancelDiagDelete = (diagnosisId) => {
        setDiagnosis(diagnosis.map(diag => {
            if (diag.Id === diagnosisId) {
                return { ...diag, isDeleting: false }; // Reset isDeleting for the specific diagnosis
            }
            return diag;
        }));
    };

    const handleAddNewDiagnosis = () => {
        const tempId = -1 * (new Date()).getTime(); // Example of a temporary ID
    
        const newDiagnosis = {
            Id: tempId,
            DoctorId: '',
            Diagnosis: '',
            Description: '', 
            Date: '',
            isEditing: true, 
        };
        setDiagnosis([...diagnosis, newDiagnosis]);
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

    const deleteMedication = async (patientId, medicationId) => {
        try {
            const url = `http://localhost:5000/patients/${patientId}/medication/${medicationId}`;
            const response = await fetch(url, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error('Failed to delete the medication.');
            }

            // Filter out the deleted medication from the medications state
            setMedications(currentMedications =>
                currentMedications.filter(medication => medication.Id !== medicationId)
            );

        } catch (error) {
            console.error(error);
        }
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

    const addDiagnosis = async (patientId, newDiagnosisData) => {
        try {
            const response = await fetch(`http://localhost:5000/patients/${patientId}/diagnosis`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDiagnosisData),
            });

            if (!response.ok) {
                throw new Error('Failed to add new diagnosis');
            }

            const data = await response.json();
            console.log('New diagnosis added:', data);
            // Update the state or perform any other actions needed after adding the diagnosis
        } catch (error) {
            console.error('Error adding new diagnosis:', error);
        }
    };

    const deleteDiagnosis = async (patientId, diagnosisId) => {
        try {
            const response = await fetch(`http://localhost:5000/patients/${patientId}/diagnosis/${diagnosisId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the diagnosis.');
            }

            // Filter out the deleted diagnosis from the diagnoses state
            setDiagnosis(currentDiagnoses =>
                currentDiagnoses.filter(diagnosis => diagnosis.Id !== diagnosisId)
            );


            console.log(`Diagnosis with ID ${diagnosisId} deleted successfully.`);
            // Update the state or perform any other actions needed after deleting the diagnosis
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
          <Navbar />
          <TopPage headerName="Patientgegevens" patientId={patientId} imageSrc={imageSrc} />
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-3">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <p className="mb-0">Patientgegevens</p>
                    {isEditing ? (
                      <div>
                        <button className="btn btn-outline-success btn-sm me-1" onClick={handleSaveClick}>
                          <i className="bi bi-check-circle"></i>
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={handleCancelClick}>
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-outline-primary btn-sm" onClick={handleEditClick}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    )}
                  </div>
                  <div className="card-body">
                    {[
                      { label: "Achternaam", value: lastName, editValue: editedLastName, onChange: setEditedLastName },
                      { label: "Voornaam", value: firstName, editValue: editedFirstName, onChange: setEditedFirstName },
                      { label: "Leeftijd", value: new Date().getFullYear() - new Date(birthdate).getFullYear() },
                      { label: "Geslacht", value: gender, editValue: editedGender, onChange: setEditedGender },
                      { label: "Diagnose(s)", value: Array.isArray(diagnosis) ? diagnosis.map(d => d.Diagnosis).join(', ') : '' },
                      { label: "Geboortedatum", value: birthdate ? new Date(birthdate).toDateString() : '', editValue: editedBirthdate, onChange: setEditedBirthdate, isDate: true },
                      { label: "Telefoonnummer", value: phone_number, editValue: editedPhoneNumber, onChange: setEditedPhoneNumber },
                      { label: "Emailadres", value: email, editValue: editedEmail, onChange: setEditedEmail }
                    ].map((field, index) => (
                      <div key={index} className="mb-3 d-flex justify-content-between align-items-center">
                        <p className="mb-0">{field.label}</p>
                        {isEditing && field.editValue !== undefined ? (
                          field.isDate ? (
                            <input
                              type="date"
                              className="form-control uniform-input"
                              value={field.editValue ? new Date(field.editValue).toISOString().split('T')[0] : ''}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          ) : (
                            <input
                              type="text"
                              className="form-control uniform-input"
                              value={field.editValue}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          )
                        ) : (
                          <p className="mb-0">{field.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-3">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <p className="mb-0">Contactpersoon</p>
                    {isEditingContact ? (
                      <div>
                        <button className="btn btn-outline-success btn-sm me-1" onClick={handleSaveContactClick}>
                          <i className="bi bi-check-circle"></i>
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={handleCancelContactClick}>
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-outline-primary btn-sm" onClick={handleEditContactClick}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    )}
                  </div>
                  <div className="card-body">
                    {[
                      { label: "Naam", value: lastNameContact, editValue: editedLastNameContact, onChange: setEditedLastNameContact },
                      { label: "Voornaam", value: firstNameContact, editValue: editedFirstNameContact, onChange: setEditedFirstNameContact },
                      { label: "Email", value: emailContact, editValue: editedEmailContact, onChange: setEditedEmailContact },
                      { label: "Telefoonnummer", value: phoneNumberContact, editValue: editedPhoneNumberContact, onChange: setEditedPhoneNumberContact }
                    ].map((field, index) => (
                      <div key={index} className="mb-3 d-flex justify-content-between align-items-center">
                        <p className="mb-0">{field.label}</p>
                        {isEditingContact && field.editValue !== undefined ? (
                          <input
                            type="text"
                            className="form-control uniform-input"
                            value={field.editValue}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        ) : (
                          <p className="mb-0">{field.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-3">
                        <p className="mb-3 text-center">Nieuwe medicijn</p>
                        <button className="add-button btn btn-outline-primary mb-3"  onClick={handleAddNewMedication}>
                            <i className="bi bi-plus h1"></i>
                        </button>
                    </div>
                </div>
                {Array.isArray(medications) && medications.length > 0 && (
                  medications.map((medication, index) => (
                    <div key={index} className="col-md-6">
                        <div className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <p className="mb-0">Medicatie</p>
                            <div>
                            {medication.isEditing ? (
                                <div>
                                <button className="btn btn-outline-success btn-sm me-1" onClick={() => handleSaveMedicationClick(medication.Id)}>
                                    <i className="bi bi-check-circle"></i>
                                </button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleCancelMedicationClick(medication.Id)}>
                                    <i className="bi bi-x-circle"></i>
                                </button>
                                </div>
                            ) : medication.isDeleting ? (
                                <div>
                                <button className="btn btn-outline-success btn-sm me-1" onClick={() => confirmDelete(medication.Id)}>
                                    <i className="bi bi-check-circle"></i>
                                </button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => cancelDelete(medication.Id)}>
                                    <i className="bi bi-x-circle"></i>
                                </button>
                                </div>
                            ) : (
                                <div>
                                <button className="btn btn-outline-primary btn-sm me-1" onClick={() => handleEditMedicationClick(medication.Id)}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteButtonClick(medication.Id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                                </div>
                            )}
                            </div>
                        </div>
                        <div className="card-body">
                            {[
                            { label: "Medicijn", value: medication.Name, editValue: medication.Name, onChange: (e) => handleInputChange(medication.Id, 'Name', e.target.value) },
                            { label: "Gebruik", value: medication.Dose, editValue: medication.Dose, onChange: (e) => handleInputChange(medication.Id, 'Dose', e.target.value) },
                            { label: "Frequentie", value: medication.Frequency, editValue: medication.Frequency, onChange: (e) => handleInputChange(medication.Id, 'Frequency', e.target.value) },
                            { label: "Startdatum", value: medication.Start_date ? new Date(medication.Start_date).toDateString() : '', editValue: medication.Start_date, onChange: (e) => handleInputChange(medication.Id, 'Start_date', e.target.value), isDate: true }
                            ].map((field, index) => (
                            <div key={index} className="mb-3 d-flex justify-content-between align-items-center">
                                <p className="mb-0">{field.label}</p>
                                {medication.isEditing ? (
                                field.isDate ? (
                                    <input
                                    type="date"
                                    className="form-control uniform-input"
                                    value={field.editValue ? new Date(field.editValue).toISOString().split('T')[0] : ''}
                                    onChange={field.onChange}
                                    />
                                ) : (
                                    <input
                                    type="text"
                                    className="form-control uniform-input"
                                    value={field.editValue}
                                    onChange={field.onChange}
                                    />
                                )
                                ) : (
                                <p className="mb-0">{field.value}</p>
                                )}
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                  ))
                )}
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-3">
                        <p className="mb-3 text-center">Nieuwe diagnosis</p>
                        <button className="add-button btn btn-outline-primary mb-3" onClick={handleAddNewDiagnosis}>
                            <i className="bi bi-plus h1"></i>
                        </button>
                    </div>
                </div>
                {Array.isArray(diagnosis) && diagnosis.length > 0 && (
                  diagnosis.map((diag, index) => (
                <div key={index} className="col-md-6">
                    <div className="card mb-3">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <p className="mb-0">Diagnose</p>
                        <div>
                          {diag.isEditing ? (
                            <div>
                              <button className="btn btn-outline-success btn-sm me-1" onClick={() => handleSaveDiagnosisClick(diag.Id)}>
                                <i className="bi bi-check-circle"></i>
                              </button>
                              <button className="btn btn-outline-danger btn-sm" onClick={() => handleCancelDiagnosisClick(diag.Id)}>
                                <i className="bi bi-x-circle"></i>
                              </button>
                            </div>
                          ) : diag.isDeleting ? (
                            <div>
                              <button className="btn btn-outline-success btn-sm me-1" onClick={() => confirmDiagDelete(diag.Id)}>
                                <i className="bi bi-check-circle"></i>
                              </button>
                              <button className="btn btn-outline-danger btn-sm" onClick={() => cancelDiagDelete(diag.Id)}>
                                <i className="bi bi-x-circle"></i>
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button className="btn btn-outline-primary btn-sm me-1" onClick={() => handleEditDiagnosisClick(diag.Id)}>
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button className="btn btn-outline-danger btn-sm" onClick={() => handleDiagDeleteButtonClick(diag.Id)}>
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="card-body">
                        {[
                          { label: "Dokter ID", value: diag.DoctorId, editValue: diag.DoctorId, onChange: (e) => handleInputChangeForDiagnosis(diag.Id, 'DoctorId', e.target.value) },
                          { label: "Diagnose", value: diag.Diagnosis, editValue: diag.Diagnosis, onChange: (e) => handleInputChangeForDiagnosis(diag.Id, 'Diagnosis', e.target.value) },
                          { label: "Beschrijving", value: diag.Description, editValue: diag.Description, onChange: (e) => handleInputChangeForDiagnosis(diag.Id, 'Description', e.target.value) },
                          { label: "Datum", value: diag.Date ? new Date(diag.Date).toDateString() : '', editValue: diag.Date, onChange: (e) => handleInputChangeForDiagnosis(diag.Id, 'Date', e.target.value), isDate: true }
                        ].map((field, index) => (
                          <div key={index} className="mb-3 d-flex justify-content-between align-items-center">
                            <p className="mb-0">{field.label}</p>
                            {diag.isEditing ? (
                              field.isDate ? (
                                <input
                                  type="date"
                                  className="form-control uniform-input"
                                  value={field.editValue ? new Date(field.editValue).toISOString().split('T')[0] : ''}
                                  onChange={field.onChange}
                                />
                              ) : (
                                <input
                                  type="text"
                                  className="form-control uniform-input"
                                  value={field.editValue}
                                  onChange={field.onChange}
                                />
                              )
                            ) : (
                              <p className="mb-0">{field.value}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
                  ))
                )}
              </div>
            </div>
        </>
      );
    };
    
    export default PatientSettingsPage;