import React, { useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';

function MyometriePage() {
    const { patientId } = useParams();
    const imageSrc = '../src/assets/kid_1.png';
    const patientName = 'John Doe';

    const [cmasScores] = useState({
        headElevation: { left: { score: 1, average: 1 }, right: { score: 2, average: 2 }, joint: 'Nek' },
        floorSit: { left: { score: 2, average: 2 }, right: { score: 3, average: 3 }, joint: 'Heupen, knieën' },
        legRaise: { left: { score: 3, average: 3 }, right: { score: 4, average: 4 }, joint: 'Heup, knie' },
        straightLegLift: { left: { score: 4, average: 4 }, right: { score: 5, average: 5 }, joint: 'Heup, knie' },
        supineToProne: { left: { score: 5, average: 5 }, right: { score: 6, average: 6 }, joint: 'Heup, knie' },
        allFoursManoeuvre: { left: { score: 6, average: 6 }, right: { score: 7, average: 7 }, joint: 'Schouders, heupen, knieën' },
        floorRise: { left: { score: 7, average: 7 }, right: { score: 8, average: 8 }, joint: 'Heupen, knieën' },
        sitUps: { left: { score: 8, average: 8 }, right: { score: 9, average: 9 }, joint: 'Heupen, knieën' },
        chairRises: { left: { score: 9, average: 9 }, right: { score: 10, average: 10 }, joint: 'Heupen, knieën' },
        supineToSit: { left: { score: 10, average: 10 }, right: { score: 11, average: 11 }, joint: 'Heupen, knieën' },
        armRaise: { left: { score: 11, average: 11 }, right: { score: 12, average: 12 }, joint: 'Schouders' },
        stoolStep: { left: { score: 12, average: 12 }, right: { score: 13, average: 13 }, joint: 'Heupen, knieën' },
        armRaiseDuration: { left: { score: 13, average: 13 }, right: { score: 14, average: 14 }, joint: 'Schouders' },
        pickUp: { left: { score: 14, average: 14 }, right: { score: 15, average: 15 }, joint: 'Heupen, knieën' },
    });

    const [note, setNote] = useState('');

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const totalItemScore = Object.values(cmasScores).reduce((total, { left, right }) => {
        return total + (left.score + right.score);
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
                                <th>Gemiddelde Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(cmasScores).map(([item, scores]) => (
                                <tr key={item}>
                                    <td>{item}</td>
                                    <td>{scores.joint}</td>
                                    <td style={{ margin: '5px' }}>
                                        <div>Links: {scores.left.score}</div>
                                        <div>Rechts: {scores.right.score}</div>
                                    </td>
                                    <td>{scores.left.score + scores.right.score}</td>
                                    <td>{(scores.left.average + scores.right.average) / 2}</td>
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
