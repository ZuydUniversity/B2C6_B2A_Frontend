import React, {useEffect, useState } from 'react';
import Select from 'react-select';
import Navbar from '../components/Navbar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

const AppointmentCreate = () => {
    const [participants, setParticipants] = useState([]);
    const [options, setOptions] = useState([]);

    const handleChange = (selectedOption) => {
        setParticipants(selectedOptions || []);
    };

    const handleInputChange = (inputValue) => {
        if(!inputValue) return;

        //Fetch options from API
        //Change these values to correct backend values
        api.get(`/users?search=${inputValue}`).then((response) => {
            const fetchedOptions = response.data.map((user) => ({
                value: user.id,
                label: user.name
            }));
        });
    };

    return (
    <>
        <Navbar />
        <h1>Afspraak maken</h1>
        <form>
            <label htmlFor="description">Beschrijving:</label>
            <input type="text" id="description" name="description" />
            <label htmlFor="date">Datum:</label>
            <input type="date" id="date" name="date" />
            <label htmlFor="time">Tijd:</label>
            <input type="time" id="time" name="time" />
            <button type="submit">Afspraak maken</button>
        </form>
    </>
    )
}

export default AppointmentCreate;