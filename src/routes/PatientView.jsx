import Navbar from '../components/Navbar'; //double period to go back one directory
import App from '../App';

function PatientView() {
  const imageSrc = '../src/assets/kid_1.png';
  const patientName = 'John Doe';


  return (
    <div className="PatientView">
      <Navbar />
      <div className="PageTop">
        <h1>{patientName}</h1>
        <img className="patient-image" src={imageSrc}></img>
      </div>
      <div className='PageBottom'>
        <div className="ResultsBlock Block">
          <p>Resultaten</p>
          {Array.from({ length: 3 }, (_, i) => (
            <div className="textual-data-row" key={i}>
              <p>{i}</p>
              <p>result {i}</p>
            </div>
          ))}
          <button>Zie alles</button>
        </div>
        <div className="EssayBlock Block">
          <p>Resultaten</p>
          {Array.from({ length: 3 }, (_, i) => (
            <div className="textual-data-row" key={i}>
              <p>{i}</p>
              <p>result {i}</p>
            </div>
          ))}
          <button>Zie alles</button>
        </div>
        <div className="DataBlock Block">
          <p>Resultaten</p>
          {Array.from({ length: 3 }, (_, i) => (
            <div className="textual-data-row" key={i}>
              <p>{i}</p>
              <p>result {i}</p>
            </div>
          ))}
          <button>Zie alles</button>
        </div>
      </div>
    </div>
  );
}

export default PatientView;
