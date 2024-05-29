import '../App.css'; // Import the CSS file
import Navbar from '../components/Navbar'; //double period to go back one directory
import React from 'react';
import Carousel from '../components/Carousel';

//more information about the carousel used in this file can be found here:
//https://stackademic.com/blog/mastering-react-carousel-building-dynamic-image-sliders

function RadiologyPage() {
    const kid_1_img = '../src/assets/kid_1.png';
    const kid_2_img = '../src/assets/kid_2.png';
    const kid_3_img = '../src/assets/kid_3.png';
    const imageSrc = kid_1_img
    const patientName = 'John Doe';


    const images = [
        kid_1_img, kid_2_img, kid_3_img,
    ];

    const data = [
        { aspect: 'Links', type: 'Schouder', evaluation: 'Gebroken' },
        { aspect: 'Rechts', type: 'Schouder', evaluation: 'Gekneusd' },
    ];

    const DataRow = ({ aspect, type, evaluation }) => (
        <tr onClick={() => window.alert('Row clicked!')}>
            <td className="text-cell"><div className="rounded-left">{aspect}</div></td>
            <td className="text-cell"><div className="rounded-right">{type}</div></td>
            <td className="spacer"></td>
            <td className="text-cell"><div className="rounded-right rounded-left">{evaluation}</div></td>
        </tr>
    );

    const DataTable = ({ data }) => (
        <>
            <table>
                <thead>
                    <tr>
                        <th className="th-header-left"><div className="header-rounded-left header-item">Aspect</div></th>
                        <th className="th-header-right"><div className="header-rounded-right header-item">Type</div></th>
                        <th className="spacer"></th>
                        <th className="th-header-middle"><div className="header-rounded-left header-rounded-right header-item">Beoordeling</div></th>
                    </tr>
                </thead>
            </table>


            <div className="scrollable-table">
                <table>
                    <tbody>
                        {data.map((row, index) => <DataRow key={index} {...row} />)}
                    </tbody>
                </table>
            </div>
        </>
    );



    return (
        <>
            <Navbar />
            <div className="top-page">
                <div>
                    <h1>Radiologie resultaten:</h1>
                    <DataTable data={data} />
                </div>
                <div className="patient-data-block">
                    <h3 className="patient-name-results">{patientName}</h3>
                    <img className="patient-image-results" src={imageSrc} alt="patient" />
                </div>
                
            </div>



            <div className="bottom-page">
                <Carousel images={images} />
                <textarea placeholder="Notities gaan hier..."></textarea>
            </div>
        </>
    );
}

export default RadiologyPage;