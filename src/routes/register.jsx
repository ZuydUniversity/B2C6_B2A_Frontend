import '../../styling/Login.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '../components/Navbar';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [accountType, setAccountType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [patientNumber, setPatientNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [photo, setPhoto] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactName, setContactName] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/'); 
    };

    const register = async (e) => {
        e.preventDefault(); 

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('accountType', accountType);
        formData.append('employeeNumber', employeeNumber);
        formData.append('specialization', specialization);
        formData.append('patientNumber', patientNumber);
        formData.append('gender', gender);
        formData.append('birthDate', birthDate);
        formData.append('phoneNumber', phoneNumber);
        formData.append('photo', photo);
        formData.append('contact_email', contactEmail);
        formData.append('contact_phone', contactPhone);
        formData.append('contact_name', contactName);

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) { 
                if(response.status === 500) {
                    throw new Error('Server error, probeer het later opnieuw');
                }
                throw new Error('E-mailadres is al in gebruik, probeer het opnieuw.');
            }

            setMessage('Registratie successvol');
            navigateToLogin();

        } catch (error) {
            console.error('Registration error:', error);
            setMessage(error.message);
        }
    };

    const changeAccount = (e) => {
        setAccountType(e.target.value);
        setEmployeeNumber('');
        setSpecialization('');
        setPatientNumber('');
        setGender('');
        setBirthDate('');
        setPhoneNumber('');
        setPhoto('');
        setContactEmail('');
        setContactName('');
        setContactPhone('');
    };

    const renderForm = () => {
        switch (accountType) {
            case 'Doctor':
                return (
                    <>
                        <Form.Group controlId="formEmployeeNumber" className="mb-3">
                            <Form.Label>Personeelsnummer</Form.Label>
                            <Form.Control type="number" value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formSpecialization" className="mb-3">
                            <Form.Label>Specialisatie</Form.Label>
                            <Form.Control type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber" className="mb-3">
                            <Form.Label>Telefoonnummer</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </Form.Group>
                    </>
                );
            case 'Patient':
                return (
                    <>
                        <Form.Group controlId="formPatientNumber" className="mb-3">
                            <Form.Label>Patiëntnummer</Form.Label>
                            <Form.Control type="number" value={patientNumber} onChange={(e) => setPatientNumber(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formGender" className="mb-3">
                            <Form.Label>Geslacht</Form.Label>
                            <Form.Control type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formBirthDate" className="mb-3">
                            <Form.Label>Geboortedatum</Form.Label>
                            <Form.Control type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber" className="mb-3">
                            <Form.Label>Telefoonnummer</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formContactName" className="mb-3">
                            <Form.Label>Contactpersoon Naam</Form.Label>
                            <Form.Control type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formContactEmail" className="mb-3">
                            <Form.Label>Contactpersoon E-mailadres</Form.Label>
                            <Form.Control type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formContactPhone" className="mb-3">
                            <Form.Label>Contactpersoon Telefoonnummer</Form.Label>
                            <Form.Control type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                        </Form.Group>
                    </>
                );
            case 'Admin':
                return null; // No additional fields for Admin
            case 'Researcher':
                return null; // No additional fields for Researcher
            default:
                return null;
        }
    };

    return (
        <>
        <Navbar />
        <Container className="d-flex flex-column align-items-center formwidth container">
            <h1 className="centered_title"><i className="bi bi-person-plus-fill"></i> Account aanmaken</h1>
            <div className="login_style p-4 rounded shadow" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <Form onSubmit={register}>
                    <Form.Group controlId="formAccountType" className="mb-3">
                        <Form.Label>Accounttype</Form.Label>
                        <Form.Control as="select" value={accountType} onChange={changeAccount} required>
                            <option value="" disabled>Selecteer een accounttype</option>
                            <option value="Doctor">Dokter</option>
                            <option value="Patient">Patiënt</option>
                            <option value="Admin">Beheerder</option>
                            <option value="Researcher">Onderzoeker</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFirstName" className="mb-3">
                        <Form.Label>Voornaam</Form.Label>
                        <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formLastName" className="mb-3">
                        <Form.Label>Achternaam</Form.Label>
                        <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>E-mailadres</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Wachtwoord</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formPhoto" className="mb-3">
                        <Form.Label>Profielfoto</Form.Label>
                        <Form.Control type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setPhoto(e.target.files[0])} required />
                    </Form.Group>
                    {accountType && renderForm()}
                    <Button variant="primary" type="submit" className="login_button w-100">
                        <i className="bi bi-person-plus-fill"></i> Registreren
                    </Button>
                    {message && <Alert variant="danger" className="mt-3">{message}</Alert>}
                </Form> <br />
                <Button variant="primary" onClick={navigateToLogin} className="login_button w-100">Terug</Button>
            </div>
        </Container>
        </>
    );
}

export default Register;
