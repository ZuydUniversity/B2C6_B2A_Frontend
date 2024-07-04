import '../styling/Main.css';
import '../styling/Patientenoverzicht.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';

function MyometriePage() {
    const { patientId, resultId } = useParams();
    const imageSrc = '/src/assets/kid_1.png';
    const [cmasScores, setCmasScores] = useState([]);
    const [note, setNote] = useState('');
    const [message, setMessage] = useState('');
    const [isNoteExisting, setIsNoteExisting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedScores, setEditedScores] = useState([]);

    useEffect(() => {
        fetchNotes();
        fetchCMASScores();
    }, [patientId, resultId]);

    const fetchNotes = () => {
        axios.get(`http://127.0.0.1:5000/results/${resultId}/notes`)
            .then(response => {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const allNotes = response.data.map(note => note.Type).join('\n');
                    setNote(allNotes);
                    setIsNoteExisting(true);
                    console.log("Note data:", response.data);
                } else {
                    console.log("No note data found or invalid structure:", response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching note data:", error);
            });
    };

    const fetchCMASScores = () => {
        axios.get(`http://127.0.0.1:5000/patients/${patientId}/excercises`)
            .then(response => {
                setCmasScores(response.data);
            })
            .catch(error => {
                console.error("Error fetching CMAS scores:", error);
            });
    };

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleNoteSave = () => {
        console.log("Saving note...");

        const data = {
            note: note,
            doctor_id: 1
        };

        console.log("Data:", data);

        const url = isNoteExisting 
            ? `http://127.0.0.1:5000/patient/${patientId}/result/${resultId}/edit_note`
            : `http://127.0.0.1:5000/patient/${patientId}/result/${resultId}/add_note`;

        const method = isNoteExisting ? axios.put : axios.post;

        method(url, data)
            .then(response => {
                console.log("Note saved successfully:", response.data);
                setMessage('Note added/updated successfully!');
                setIsNoteExisting(true);
                fetchNotes(); // Refresh the notes
            })
            .catch(error => {
                console.error("Error saving note:", error);
                setMessage('Error saving note.');
            });
    };

    const handleEditScores = () => {
        if (!isEditing) {
            setEditedScores(cmasScores.map(score => ({ ...score })));
        }
        setIsEditing(!isEditing);
    };

    const handleScoreChange = (index, side, value) => {
        const updatedScores = [...editedScores];
        updatedScores[index][side] = parseInt(value, 10);
        setEditedScores(updatedScores);
    };

    const handleSaveScores = () => {
        const requests = editedScores.map(score => {
            return axios.put(`http://127.0.0.1:5000/patients/${patientId}/excercises/${score.Id}`, {
                Left: score.Left,
                Right: score.Right,
                Type: score.Type,
                Gewricht: score.Gewricht,
                CMASId: score.CMASId
            });
        });
    
        Promise.all(requests)
            .then(responses => {
                console.log("Save scores responses:", responses);
                setCmasScores(editedScores);
                setIsEditing(false);
                setMessage('Scores updated successfully!');
            })
            .catch(error => {
                console.error("Error saving scores:", error);
                const errorMessage = error.response ? error.response.data : error.message;
                setMessage(`Error saving scores: ${JSON.stringify(errorMessage)}`);
            });
    };

    const totalItemScore = cmasScores.reduce((total, { Left, Right }) => {
        return total + (Left + Right);
    }, 0);

    return (
        <>
            <Navbar />
            <TopPage headerName="Patient" patientId={patientId} imageSrc={imageSrc} />
            <div className="container mt-4">
                <h2 className="d-flex justify-content-between">
                    CMAS Scores
                    {isEditing ? (
                        <button className="btn btn-outline-primary" onClick={handleSaveScores}>Scores opslaan</button>
                    ) : (
                        <button className="btn btn-outline-primary" onClick={handleEditScores}>Scores aanpassen</button>
                    )}
                </h2>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Gewricht</th>
                                <th>Links/Rechts (score)</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isEditing ? editedScores.map((exercise, index) => (
                                <tr key={exercise.Id}>
                                    <td>{exercise.Type}</td>
                                    <td>{exercise.Gewricht}</td>
                                    <td>
                                        <div>
                                            Links: <input 
                                                type="number" 
                                                value={exercise.Left} 
                                                onChange={(e) => handleScoreChange(index, 'Left', e.target.value)} 
                                                className="form-control d-inline w-auto"
                                            />
                                        </div>
                                        <div>
                                            Rechts: <input 
                                                type="number" 
                                                value={exercise.Right} 
                                                onChange={(e) => handleScoreChange(index, 'Right', e.target.value)} 
                                                className="form-control d-inline w-auto"
                                            />
                                        </div>
                                    </td>
                                    <td>{exercise.Left + exercise.Right}</td>
                                </tr>
                            )) : cmasScores.map((exercise) => (
                                <tr key={exercise.Id}>
                                    <td>{exercise.Type}</td>
                                    <td>{exercise.Gewricht}</td>
                                    <td>
                                        <div>Links: {exercise.Left}</div>
                                        <div>Rechts: {exercise.Right}</div>
                                    </td>
                                    <td>{exercise.Left + exercise.Right}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container mt-4 pb-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Totaalscore</h2>
                        <p>{totalItemScore}</p>
                    </div>
                    <div className="col-md-6">
                        <h2>Voeg een notitie toe</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-3">
                                <textarea className="form-control"
                                    value={note}
                                    onChange={handleNoteChange}
                                    placeholder="Voeg een notitie toe" 
                                    rows="4"
                                />
                            </div>
                            <button type="button" className="btn btn-outline-primary" onClick={handleNoteSave}>Notities opslaan</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyometriePage;