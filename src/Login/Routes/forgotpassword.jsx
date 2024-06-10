import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '../../components/Navbar';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styling/App.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/'); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setMessage('Wachtwoorden komen niet overeen, probeer het opnieuw');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) { 
                setMessage('Wachtwoord is veranderd');
            } else {
                if(response.status === 500) {
                    throw new Error('Server error, probeer het later opnieuw');
                }
                throw new Error('E-mailadres niet gevonden, probeeer het opnieuw');
            }
        } catch (error) {
            console.error('Email not found:', error);
            setMessage(error.message);
        }
    };

    return (
      <>
        <Navbar />
        <Container className="mt-5 formwidth">
            <h1 className="centered-title"><i className="bi bi-question-circle-fill"></i> Wachtwoord resetten</h1>
            <div className="login_style p-4 rounded shadow">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>E-mailadres</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Nieuw wachtwoord</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formPassword2" className="mb-3">
                        <Form.Label>Herhaal nieuw wachtwoord</Form.Label>
                        <Form.Control type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="login_button w-100 btn btn-primary">
                        <i className="bi bi-check2-square"></i> Opslaan
                    </Button>
                </Form> <br />
                <Button variant="link" onClick={navigateToLogin} className="login_button w-100">Terug</Button>
                {message && <Alert variant="danger" className="mt-3">{message}</Alert>}
            </div>
        </Container>
      </>
    );
}

export default ForgotPassword;
