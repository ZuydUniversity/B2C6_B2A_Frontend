import '../styling/Main.css';
import '../styling/Patientenoverzicht.css';
import Navbar from '../components/Navbar';
import React from 'react';
import Carousel from '../components/Carousel';
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';

function RadiologyPage() {
    const { patientId } = useParams();
    const shoulder_1 = '../../src/assets/shoulder_1.jpg';
    const shoulder_2 = '../../src/assets/shoulder_2.jpg';
    const imageSrc = '../../src/assets/kid_1.png';
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
            <td scope="col">{aspect}</td>
            <td scope="col">{type}</td>
            <td scope="col">{evaluation}</td>
        </tr>
    );

    const DataTable = ({ data }) => (
        <>
            <div className="table-responsive">
            <table className="table table-hover">
                <thead className="thead">
                    <tr>
                        <th scope="col">Aspect</th>
                        <th scope="col">Type</th>
                        <th scope="col">Beoordeling</th>
                    </tr>
                </thead>
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
            <TopPage headerName="Patiënt" patientId={patientId} imageSrc={imageSrc} />
            <div className='container my-4'>
                <DataTable data={data} />
            </div>
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-6">
                        <Carousel images={images} />
                    </div>
                    <div className="col-md-6 d-flex flex-column">
                        <div className="form-group mt-4 mb-4 flex-grow-1">
                            <textarea className="form-control h-100" placeholder="Voeg een notitie toe"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RadiologyPage;