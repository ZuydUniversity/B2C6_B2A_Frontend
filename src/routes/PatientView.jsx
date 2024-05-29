import Navbar from '../components/Navbar'; //double period to go back one directory
import App from '../App';
import { Link } from 'react-router-dom';
import TopPage from '../components/TopPage';

function PatientView() {
    const imageSrc = '../src/assets/kid_1.png';
    const patientName = 'John Doe';
    const phoneNumber = '0612345678';
    const mail = 'John_doe@gmail.com';
    const diagnosis = 'JDM';


    return (
        <>
            <Navbar />
            <div className="PatientView">
                <TopPage headerName="Patient Opties" patientName={patientName} imageSrc={imageSrc} />
                <div className='PageBottom'>
                    <div className="ResultsBlock Block">
                        <p>Resultaten</p>
                        {Array.from({ length: 3 }, (_, i) => (
                            <div className="textual-data-row" key={i}>
                                <p>{i} result {i}</p>
                            </div>
                        ))}
                        <Link to="/resultoverview"><button>Zie alles</button></Link>
                    </div>
                    <div className="EssayBlock Block">
                        <p>Verslagen</p>
                        <div className="DataBlockData">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div className="textual-data-row" key={i}>
                                    <p>{i}: Verslag {i}</p>
                                </div>
                            ))}
                        </div>
                        <Link to="/essaypage"><button>Zie alles</button></Link>
                    </div>
                    <div className="DataBlock Block">
                        <p>Gegevens</p>
                        <div className="DataBlockData">
                            <p>Nummer: {phoneNumber}</p>
                            <p>Mail: {mail}</p>
                            <p>Diagnose: {diagnosis}</p>
                        </div>
                        <Link to="/patientsettingspage"><button>Zie alles</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientView;
