import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../components/Navbar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

const AppointmentView = () => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [participants, setParticipants] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const { id, action } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (action === 'edit') {
            setIsEditing(true);
            fetchAppointmentData();
        } else if (action === 'view') {
            setIsViewing(true);
            fetchAppointmentData();
        }
    }, [id, action]);

    const fetchAppointmentData = () => {
        api.get(`/appointment/get/${id}`)
            .then((response) => {
                const { Description, Date: appointmentDate, Participants } = response.data;
                setDescription(Description);

                const formattedDate = appointmentDate.split('T')[0];
                const formattedTime = appointmentDate.split('T')[1].slice(0, 5);

                setDate(formattedDate);
                setTime(formattedTime);
    
                setParticipants(Participants.map(participant => ({
                    value: participant.UserId,
                    label: `${participant.Name} ${participant.Lastname}`
                })));
            })
            .catch((error) => {
                console.error('Error fetching appointment data:', error);
            });
    };

    const handleInputChange = (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
            return;
        }
        api.post(`/user/search`, { search_string: inputValue }).then((response) => {
            const fetchedOptions = response.data.map((user) => ({
                value: user[0],  // ID
                label: `${user[1]} ${user[2]}`  // firstName + lastName
            }));
            callback(fetchedOptions);
        }).catch((error) => {
            console.error("Error fetching options:", error);
            callback([]);
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const dateTime = `${date} ${time}:00`;

        const appointmentData = {
            date: dateTime,
            description,
            participants: participants.map(participant => participant.value)
        };

        const request = isEditing 
            ? api.put(`/appointment/${id}/update`, appointmentData)
            : api.post('/appointment/create', appointmentData);

        request.then((response) => {
            console.log('Appointment saved successfully:', response.data);
            navigate('/appointmentoverview');
        }).catch((error) => {
            console.error('Error saving appointment:', error);
        });
    };

    return (
        <>
            <Navbar />
            <div className="container formwidth">
                <h1 className="centered_title">{isEditing ? 'Afspraak bewerken' : isViewing ? 'Afspraak bekijken' : 'Afspraak maken'}</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Beschrijving:</label>
                        {isViewing ? (
                            <p className="form-control-plaintext">{description}</p>
                        ) : (
                            <input
                                type="text"
                                id="description"
                                name="description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Datum:</label>
                        {isViewing ? (
                            <p className="form-control-plaintext">{date}</p>
                        ) : (
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="time" className="form-label">Tijd:</label>
                        {isViewing ? (
                            <p className="form-control-plaintext">{time}</p>
                        ) : (
                            <input
                                type="time"
                                id="time"
                                name="time"
                                className="form-control"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <AsyncSelect
                            isMulti
                            cacheOptions
                            defaultOptions
                            loadOptions={handleInputChange}
                            onChange={setParticipants}
                            value={participants}
                            isDisabled={isViewing}
                        />
                    </div>
                    {!isViewing && <button className="btn btn-outline-primary" type="submit">{isEditing ? 'Afspraak bijwerken' : 'Afspraak maken'}</button>}
                    <br/><button className="btn btn-outline-primary mt-1" onClick={() => window.history.back()}>
                        <i className="bi bi-arrow-left"></i> Terug
                    </button>
                </form>
            </div>
        </>
    );
}

export default AppointmentView;
