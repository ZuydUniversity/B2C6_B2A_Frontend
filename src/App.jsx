import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar';
import './styling/App.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                if(response.status === 500) {
                    throw new Error('Server error, probeer het later opnieuw');
                }
                throw new Error('Inloggen mislukt, probeer het opnieuw');
            }

            if (response.ok) { // code : 200-299
                setLoginError('Inloggen successvol');
            }

        } catch (error) {
            console.error('Login error:', error);
            setLoginError(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <Container className="d-flex flex-column align-items-center mt-5 formwidth">
                <h1 className="centered-title"><i className="bi bi-person-circle"></i> Inloggen</h1>
                
                <div className="login_style p-4 rounded shadow">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className="mb-3 text-left">
                            <Form.Label className='form-label'><i className="bi bi-envelope-at-fill"></i> E-mailadres</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label><i className="bi bi-key-fill"></i> Wachtwoord</Form.Label>
                            <Form.Control 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='login_button w-100'>
                            <i className="bi bi-box-arrow-right"></i> Inloggen
                        </Button>
                    </Form>
                </div>

                <div className="login_style p-4 rounded shadow mt-3">
                    <Form action="/register" method="GET">
                        <Button variant="secondary" type="submit" className='login_button w-100 mb-2'>
                            <i className="bi bi-person-plus-fill"></i> Account aanmaken
                        </Button>
                    </Form>
                    <Form action="/forgot-password" method="GET">
                        <Button variant="secondary" type="submit" className='login_button w-100'>
                            <i className="bi bi-question-circle-fill"></i> Wachtwoord vergeten?
                        </Button>
                    </Form>
                </div>

                {loginError && <Alert variant="danger" className="mt-3">{loginError}</Alert>}

                <div className="bottom-right-text position-fixed" style={{ right: '10px', bottom: '10px' }}>
                    {`Mogelijk gemaakt door \n \t \t       Klas B2A`}
                </div>
            </Container>
        </>
    );
};

export default App;
