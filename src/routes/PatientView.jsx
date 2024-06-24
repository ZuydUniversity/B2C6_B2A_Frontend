import '../styling/Main.css';
import '../styling/Patientenoverzicht.css';
import Navbar from '../components/Navbar'; //double period to go back one directory
import App from '../App';
import { Link } from 'react-router-dom';
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientView() {
    const { patientId } = useParams();
    const imageSrc = '../src/assets/kid_1.png';
    const [diagnosis, setDiagnosis] = useState([]);
    const [patient, setPatient] = useState(null);
    const [results, setResults] = useState([]);

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
                    "Lastname": patientData.Lastname,
                    "Name": patientData.Name,
                    "Phone_number": patientData.Phone_number,
                };
                console.log(patient);
                setPatient(patient);
            } catch (error) {
                console.error(`Failed to fetch patient: ${error}`);
            }
        };

        fetchPatient(patientId);
    }, [patientId]);

    const getDiagnosis = async (patientId) => {
        try {
            const response = await fetch(`http://localhost:5000/patients/${patientId}/diagnosis`);
            const data = await response.json();
            setDiagnosis(data); // set the entire data array to the diagnosis state
        } catch (error) {
            console.error('Error fetching diagnoses:', error);
        }
    };

    useEffect(() => {
        if (patient) {
            getDiagnosis(patientId);
        }
    }, [patient]);

    useEffect(() => {
        const fetchData = async (patientId) => {
          try {
            const response = await axios.get(`http://localhost:5000/patients/${patientId}/get_results`);
            setResults(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(patientId);
      }, [patientId]);

    const patientName = patient ? patient.Name : '';
    const phoneNumber = patient ? patient.Phone_number : '';
    const mail = patient ? patient.Email : '';

    return (
        <>
            <Navbar />
            <TopPage headerName="Patiënt" patientId={patientId} imageSrc={imageSrc} patientName={patientName} />
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-4 mb-4 p-0">
                        <div className="card h-100 m-3">
                            <div className="card-body">
                                <h5 className="card-title text-center">Resultaten</h5>
                                <hr class="hr" />
                                <div className="mb-3">
                                    {Array.from({ length: 3 }, (_, i) => (
                                        <div className="mb-2" key={i + 1}>
                                            {results[i] !== "" 
                                                ? (results[i] 
                                                    ? <p>{i + 1}: {results[i].Type}</p> 
                                                    : <p>{i + 1}: </p>)
                                                : <p>{i + 1}:</p>
                                }
                                        </div>
                                    ))}
                                </div>
                                <Link to={`/resultoverview/${patientId}`} className="btn btn-outline-primary d-flex justify-content-center">Alle resultaten</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4 p-0">
                        <div className="card h-100 m-3">
                            <div className="card-body">
                                <h5 className="card-title text-center">Verslagen</h5>
                                <hr class="hr" />
                                <div className="mb-3">
                                    {Array.from({ length: 3 }, (_, i) => (
                                        <div className="mb-2" key={i + 1}>
                                            <p>{i + 1}: Verslag {i + 1}</p>
                                        </div>
                                    ))}
                                </div>
                                <Link to={`/essaypage/${patientId}`} className="btn btn-outline-primary d-flex justify-content-center">Alle verslagen</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4 p-0">
                        <div className="card h-100 m-3">
                            <div className="card-body">
                                <h5 className="card-title text-center">Gegevens</h5>
                                <hr class="hr" />
                                <div className="mb-3">
                                    <p>Nummer: {phoneNumber}</p>
                                    <p>Mail: {mail}</p>
                                    <p>Diagnose:{ ' ' }
                                        {Array.isArray(diagnosis) ? 
                                            diagnosis.map(diag => diag.Diagnosis).join(', ') 
                                            : 
                                            diagnosis.Diagnosis
                                        }
                                </p>
                                </div>
                                <Link to={`/patientsettingspage/${patientId}`} className="btn btn-outline-primary d-flex justify-content-center">Alle gegevens</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientView;
