// src/MyPage.js
import Navbar from '../components/Navbar'; //double period to go back one directory
import '../App.css';

function PatientView() {
  return (
     <div className="PatientView">
      <Navbar />
      <h1>Patient</h1>
      <p>This is a new React page with CSS styling.</p>
    </div>
  );
}

export default PatientView;
