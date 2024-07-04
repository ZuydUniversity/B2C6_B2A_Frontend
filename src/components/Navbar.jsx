import { useState } from 'react';
import '../styling/Navbar.css';
import '../styling/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';

const CustomNavbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <Navbar expand="lg" className="border-bottom">
            <div className="navbar-container">
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="me-auto">
                        <Button as={Link} to="/DoctorDashboard" className="btn btn-outline-primary"><i className="bi bi-house-fill"></i> Home</Button>
                        <Button as={Link} to="/PatientOverview" className="btn btn-outline-primary"><i className="bi bi-people-fill"></i> Patiëntenoverzicht</Button>
                        <Button as={Link} to="/Kalender" className="btn btn-outline-primary"><i className="bi bi-calendar-event-fill"></i> Kalender</Button>
                    </Nav>
                    <Nav>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <FormControl
                                type="search"
                                placeholder="Zoeken..."
                                className="form-control input-border-navbar mr-1"
                                aria-label="Zoeken"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="outline-primary" type="submit"><i className="bi bi-search"></i></Button>
                        </Form>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-primary" id="dropdownMenuButton">
                                <i className="bi bi-person-circle"></i> Profiel
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/"><i className="bi bi-person-bounding-box"></i> Profielweergave</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/ProfilePage"><i className="bi bi-person-fill-gear"></i> Profielinstellingen</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to="/"><i className="bi bi-box-arrow-left"></i> Uitloggen</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default CustomNavbar;