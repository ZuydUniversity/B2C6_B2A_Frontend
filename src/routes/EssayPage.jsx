import React from 'react';
import Navbar from '../components/Navbar'; // Double period to go back one directory

const EssayPage = () => {
    const imageSrc = '../src/assets/kid_1.png';
    const patientName = 'John Doe';

    return (
        <>
            <Navbar />

            <div className="PageTop">
                <h1>{patientName}</h1>
                <img className="patient-image" src={imageSrc}></img>
            </div>

            <div>
                <h1>Welkom op de verslagen pagina</h1>
                <p>Voeg hier in de toekomst verslagen toe.</p>
            </div>
        </>
    );
};

export default EssayPage;