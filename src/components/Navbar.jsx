import { Link } from 'react-router-dom';



const Navbar = () => {
    return <div className="Navbar">
        <Link to="/" className="link">Home</Link>
        <Link to="/patientoverview" className="link">Patient Overview</Link>
    </div>
};

export default Navbar;