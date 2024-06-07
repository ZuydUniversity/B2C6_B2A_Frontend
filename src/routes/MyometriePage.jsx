import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Navbar from '../components/Navbar';
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';

function MyometriePage() {
    const { patientId } = useParams();
    const imageSrc = '../src/assets/kid_1.png';
    const patientName = 'John Doe';

    const [cmasScores, setCmasScores] = useState([]);
    const [note, setNote] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/patients/${patientId}/excercises`)
            .then(response => {
                setCmasScores(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, [patientId]);

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const totalItemScore = cmasScores.reduce((total, { Links, Rechts }) => {
        return total + (Links + Rechts);
    }, 0);

    return (
        <>
            <Navbar />
            <TopPage headerName="Patient" patientId={patientId} imageSrc={imageSrc} />
            <div className="content">
                <h2>CMAS Scores</h2>
                <div>
                    <table className="myometrietable">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Gewricht</th>
                                <th>Links/Rechts (score)</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cmasScores.map((excercise) => (
                                <tr key={excercise.Id}>
                                    <td>{excercise.Type}</td>
                                    <td>{excercise.Gewricht}</td>
                                    <td style={{ margin: '5px' }}>
                                        <div>Links: {excercise.Links}</div>
                                        <div>Rechts: {excercise.Rechts}</div>
                                    </td>
                                    <td>{excercise.Links + excercise.Rechts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h2 className='patient-results'>Totaalscore</h2>
                <p className='patient-results'>{totalItemScore}</p>
            </div>
            <div>
                <h2 className='patient-results'>Voeg een notitie toe</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <textarea className='myometrie-textarea'
                        value={note}
                        onChange={handleNoteChange}
                        placeholder="Voeg een notitie toe"
                        rows="4" /* Set the desired number of rows */
                        cols="50" /* Set the desired number of columns */
                    />
                </form>
            </div>
        </>
    );
}

export default MyometriePage;
