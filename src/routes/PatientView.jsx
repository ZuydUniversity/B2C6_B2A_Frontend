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
            <div className="PatientView">
                <TopPage headerName="Patient" patientId={patientId} imageSrc={imageSrc} />
                <div className='PageBottom'>
                    <div className="ResultsBlock Block card">
                        <p>Resultaten</p>
                        <div className="DataBlockData">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div className="textual-data-row" key={i + 1}>
                                    <p>{i + 1}: Result {i + 1}</p>
                                </div>
                            ))}
                        </div>
                        <Link to={`/resultoverview/${patientId}`} className="resultoverview-button"><button>Zie alles</button></Link>
                    </div>
                    <div className="EssayBlock Block card">
                        <p>Verslagen</p>
                        <div className="DataBlockData">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div className="textual-data-row" key={i + 1}>
                                    <p>{i + 1}: Verslag {i + 1}</p>
                                </div>
                            ))}
                        </div>
                        <Link to="/essaypage"><button>Zie alles</button></Link>
                    </div>
                    <div className="DataBlock Block card">
                        <p>Gegevens</p>
                        <div className="DataBlockData">
                            <p>Nummer: {phoneNumber}</p>
                            <p>Mail: {mail}</p>
                            <p>Diagnose: {diagnosis}</p>
                        </div>
                        <Link to={`/patientsettingspage/${patientId}`}><button>Zie alles</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientView;
