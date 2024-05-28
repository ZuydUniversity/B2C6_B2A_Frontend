import { Link } from 'react-router-dom';



const Navbar = () => {
    return <div className="Navbar">

        <Link to="/">Home</Link>
        <Link to="/patientoverview">Patient Overview</Link>
        <Link to="/resultoverview">Resultaat Overview</Link>
        <Link to="/patientview">Patient View</Link>
    </div>
};

export default Navbar;