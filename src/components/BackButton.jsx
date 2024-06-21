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
        <button onClick={handleClick} className="back_button_outline_primary back_button btn w-15">
            <i className="bi bi-arrow-left"></i> Back
        </button>
    );
};

export default BackButton;
