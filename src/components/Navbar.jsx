import { Link } from 'react-router-dom';



const Navbar = () => {
    return <div className="Navbar">
        <Link to="/" className="link">Home</Link>
        <Link to="/patientoverview" className="link">Patient Overview</Link>
        <Link to="/kalender" className="link">Kalender</Link>

    </div>
};

export default Navbar;