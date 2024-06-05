import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleClick} className="back-button">
            <i className="bi bi-arrow-left"></i> Back
        </button>
    );
};

export default BackButton;
