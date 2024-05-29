import '../App.css'; // Import the CSS file
import Navbar from '../components/Navbar'; //double period to go back one directory
import React from 'react';
import Carousel from '../components/Carousel';
import kid_1 from '../assets/kid_1.png';
import kid_2 from '../assets/kid_2.png';
import kid_3 from '../assets/kid_3.png';



function RadiologyPage() {
    const images = [
        kid_1, kid_2, kid_3,
    ];


    return (
        <>
            <Navbar />
            <h1>Radiologie</h1>
            <Carousel images={images} />
        </>
    );
}

export default RadiologyPage;