import { Link } from 'react-router-dom';



const Navbar = () => {
    return <div className="Navbar">

        <Link to="/" className="link">Home</Link>
        <Link to="/patientoverview" className="link">Patient Overview</Link>
        <Link to="/resultoverview" className="link">Resultaat Overview</Link>
        <Link to="/patientview" className="link">Patient View</Link>
    </div>
};

export default Navbar;