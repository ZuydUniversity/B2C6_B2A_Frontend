import '../../styling/Patientenoverzicht.css';
import Navbar from '../components/Navbar'; //double period to go back one directory
import React from 'react';
import Carousel from '../components/Carousel';
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';


//more information about the carousel used in this file can be found here:
//https://stackademic.com/blog/mastering-react-carousel-building-dynamic-image-sliders

function RadiologyPage() {
    const { patientId } = useParams();
    const shoulder_1 = '../src/assets/shoulder_1.jpg';
    const shoulder_2 = '../src/assets/shoulder_2.jpg';
    const imageSrc = '../src/assets/kid_1.png';
    const patientName = 'John Doe';


    const images = [
        shoulder_1, shoulder_2,
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
            <table className="radiology-datatable">
                <thead>
                    <tr>
                        <th className="th-header-left"><div className="header-rounded-left header-item">Aspect</div></th>
                        <th className="th-header-right"><div className="header-rounded-right header-item">Type</div></th>
                        <th className="spacer"></th>
                        <th className="th-header-middle"><div className="header-rounded-left header-rounded-right header-item">Beoordeling</div></th>
                    </tr>
                </thead>
            </table>


            <div className="radiology-scrollable-table">
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
            <TopPage headerName="Patient" patientId={patientId} imageSrc={imageSrc} />
            <div className='content'>
                <DataTable data={data}/>
            </div>
            <div className="bottom-page">
                <Carousel images={images} />
                <textarea placeholder="Voeg een notitie toe"></textarea>
            </div>
        </>
    );
}

export default RadiologyPage;