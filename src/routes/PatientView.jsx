import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import TopPage from '../components/TopPage';

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
                    Birthdate: patientData.Birthdate,
                    Email: patientData.Email,
                    Lastname: patientData.Lastname,
                    Name: patientData.Name,
                    Phone_number: patientData.Phone_number,
                };
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
            setDiagnosis(data);
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

    const handleNavigation = (type, id) => {
        if (type === 'Myometrie') {
            window.location.href = `/myometriepage/${patientId}/${id}`;
        } else if (type === 'Radiologie') {
            window.location.href = `/radiologypage/${patientId}/${id}`;
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <TopPage headerName="Patiënt" patientId={patientId} imageSrc={imageSrc} patientName={patientName} />
                <div className="row mt-4">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Resultaten</h5>
                                <hr />
                                <div>
                                    {results.map((result, index) => (
                                        <div className="mb-2" key={index} onClick={() => handleNavigation(result.Type, result.Id)}>
                                            <p className="mb-0">{index + 1}: {result.Type}</p>
                                        </div>
                                    ))}
                                </div>
                                <Link to={`/resultoverview/${patientId}`} className="btn btn-outline-primary mt-3">Alle resultaten</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Verslagen</h5>
                                <hr />
                                <div>
                                    {Array.from({ length: 3 }, (_, i) => (
                                        <div className="mb-2" key={i + 1}>
                                            <p className="mb-0">{i + 1}: Verslag {i + 1}</p>
                                        </div>
                                    ))}
                                </div>
                                <Link to={`/essaypage/${patientId}`} className="btn btn-outline-primary mt-3">Alle verslagen</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Gegevens</h5>
                                <hr />
                                <div>
                                    <p>Nummer: {phoneNumber}</p>
                                    <p>Mail: {mail}</p>
                                    <p>Diagnose: {Array.isArray(diagnosis) ? diagnosis.map(diag => diag.Diagnosis).join(', ') : diagnosis.Diagnosis}</p>
                                </div>
                                <Link to={`/patientsettingspage/${patientId}`} className="btn btn-outline-primary mt-3">Alle gegevens</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientView;
