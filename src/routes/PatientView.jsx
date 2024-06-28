import '../styling/Main.css';
import '../styling/Patientenoverzicht.css';
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
            <div className="PatientView">
                <TopPage headerName="Patiënt" patientId={patientId} imageSrc={imageSrc} patientName={patientName} />
                <div className='PageBottom'>
                    <div className="ResultsBlock Block card">
                        <h5>Resultaten</h5>
                        <hr className="hr" />
                        <div className="DataBlockData">
                            {results.map((result, index) => (
                                <div className="textual-data-row" key={index} onClick={() => handleNavigation(result.Type, result.Id)}>
                                    <p>{index + 1}: {result.Type}</p>
                                </div>
                            ))}
                        </div>
                        <Link to={`/resultoverview/${patientId}`} className="btn btn-outline-primary">Alle resultaten</Link>
                    </div>
                    <div className="VerslagenBlock Block card">
                        <h5>Verslagen</h5>
                        <hr className="hr" />
                        <div className="DataBlockData">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div className="mb-2" key={i + 1}>
                                    <p>{i + 1}: Verslag {i + 1}</p>
                                </div>
                            ))}
                        </div>
                        <Link to={`/essaypage/${patientId}`} className="btn btn-outline-primary">Alle verslagen</Link>
                    </div>
                    <div className="GegevensBlock Block card">
                        <h5>Gegevens</h5>
                        <hr className="hr" />
                        <div className="DataBlockData">
                            <p>Nummer: {phoneNumber}</p>
                            <p>Mail: {mail}</p>
                            <p>Diagnose: {Array.isArray(diagnosis) ? diagnosis.map(diag => diag.Diagnosis).join(', ') : diagnosis.Diagnosis}</p>
                        </div>
                        <Link to={`/patientsettingspage/${patientId}`} className="btn btn-outline-primary">Alle gegevens</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientView;
