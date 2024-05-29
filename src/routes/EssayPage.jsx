import React from 'react';
import Navbar from '../components/Navbar'; // Double period to go back one directory
import TopPage from '../components/TopPage';

const EssayPage = () => {
    const imageSrc = '../src/assets/kid_1.png';
    const patientName = 'John Doe';

    return (
        <>
            <Navbar />
            <TopPage headerName="Verslagen" patientName={patientName} imageSrc={imageSrc} />
        </>
    );
};

export default EssayPage;