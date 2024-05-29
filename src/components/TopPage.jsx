import React from 'react';
import BackButton from './BackButton'; // Make sure to import the BackButton component


const TopPage = ({ headerName, patientName, imageSrc }) => {
    return (
        <div className="top-page">
            <div className="top-page-nav-info">
                <BackButton />
                <h1>{headerName}</h1>
            </div>
            <div className="patient-data-block">
                <h3 className="patient-results">{patientName}</h3>
                <img className="patient-image-results" src={imageSrc} alt="patient" />
            </div>
        </div>
    );
};

export default TopPage;
