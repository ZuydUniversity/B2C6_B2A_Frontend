import '../styling/Main.css';
import '../styling/Patientenoverzicht.css';
import Navbar from '../components/Navbar'; //double period to go back one directory
import App from '../App';
import { Link } from 'react-router-dom';
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';

function PatientView() {
    const { patientId } = useParams();
    const imageSrc = '../src/assets/kid_1.png';
    const patientName = 'John Doe';
    const phoneNumber = '0612345678';
    const mail = 'John_doe@gmail.com';
    const diagnosis = 'JDM';

    return (
        <>
            <Navbar />
            <TopPage headerName="Patiënt" patientId={patientId} imageSrc={imageSrc} patientName={patientName} />
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-4 mb-4 p-0">
                        <div className="card h-100 m-3">
                            <div className="card-body">
                                <h5 className="card-title text-center">Resultaten</h5>
                                <hr class="hr" />
                                <div className="mb-3">
                                    {Array.from({ length: 3 }, (_, i) => (
                                        <div className="mb-2" key={i + 1}>
                                            <p>{i + 1}: Resultaat {i + 1}</p>
                                        </div>
                                    ))}
                                </div>
                                <Link to={`/resultoverview/${patientId}`} className="btn btn-outline-primary d-flex justify-content-center">Alle resultaten</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4 p-0">
                        <div className="card h-100 m-3">
                            <div className="card-body">
                                <h5 className="card-title text-center">Verslagen</h5>
                                <hr class="hr" />
                                <div className="mb-3">
                                    {Array.from({ length: 3 }, (_, i) => (
                                        <div className="mb-2" key={i + 1}>
                                            <p>{i + 1}: Verslag {i + 1}</p>
                                        </div>
                                    ))}
                                </div>
                                <Link to={`/essaypage/${patientId}`} className="btn btn-outline-primary d-flex justify-content-center">Alle verslagen</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4 p-0">
                        <div className="card h-100 m-3">
                            <div className="card-body">
                                <h5 className="card-title text-center">Gegevens</h5>
                                <hr class="hr" />
                                <div className="mb-3">
                                    <p>Nummer: {phoneNumber}</p>
                                    <p>Mail: {mail}</p>
                                    <p>Diagnose: {diagnosis}</p>
                                </div>
                                <Link to={`/patientsettingspage/${patientId}`} className="btn btn-outline-primary d-flex justify-content-center">Alle gegevens</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientView;
