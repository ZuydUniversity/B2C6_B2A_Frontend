import '../styling/Main.css';
import '../styling/Patientenoverzicht.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleClick} className="btn btn-outline-primary">
            <i className="bi bi-arrow-left"></i> Terug
        </button>
    );
};

export default BackButton;
