import React, {useEffect, useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

const AppointmentView = () => {

    return (
        <div>
            <button>Opslaan</button>
            <button>Annuleren</button>
        </div>
    )
}

export default AppointmentView;