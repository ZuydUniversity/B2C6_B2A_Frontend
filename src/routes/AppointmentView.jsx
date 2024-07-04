import { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useNavigate, useParams } from 'react-router-dom';
import "../styling/Main.css";
import "../styling/Appointment.css";
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

        // Combine date and time into a single dateTime object
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
            navigate('/appointmentoverview');  // Navigate to the appointments page or any other route
        }).catch((error) => {
            console.error('Error saving appointment:', error);
        });
    };

    return (
        <>
            <Navbar />
            <div className="container formwidth">
                <h1>{isEditing ? 'Afspraak bewerken' : isViewing ? 'Afspraak bekijken' : 'Afspraak maken'}</h1>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="description">Beschrijving:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            readOnly={isViewing}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Datum:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            readOnly={isViewing}
                        />
                        <label htmlFor="time">Tijd:</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            readOnly={isViewing}
                        />
                    </div>
                    <div>
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
                </form>
            </div>
        </>
    );
}

export default AppointmentView;
