import React from 'react';
import Navbar from '../components/Navbar'; // Double period to go back one directory
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';

const EssayPage = () => {
    const { patientId } = useParams();
    const imageSrc = '../src/assets/kid_1.png';
    const patientName = 'John Doe';

    return (
        <>
            <Navbar />
            <TopPage headerName="Patiënt" patientId={patientId} imageSrc={imageSrc} />
            <div className="container">
            </div>
        </>
    );
};

export default EssayPage;