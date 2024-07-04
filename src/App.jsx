import './styling/Main.css';
import './styling/Login.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const App = () => {
    useEffect(() => {
        Cookies.remove('auth_token');
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                if(response.status === 500) {
                    throw new Error('Server error, probeer het later opnieuw');
                }
                throw new Error('Inloggen mislukt, probeer het opnieuw');
            }

            if (response.ok) {
                setLoginError('Inloggen succesvol');
                const data = await response.json();
                Cookies.set('auth_token', data.auth_token, { expires: 1/24 });
                const user_id = data.user_id;
                if (data.role == 1) {
                    navigate(`/doctordashboard/${user_id}`);
                } else if (data.role == 2) {
                    navigate(`/patientdashboard/${user_id}`);
                } else if (data.role == 3) {
                    navigate('/adminmenu');
                } else if (data.role == 4) {
                    navigate('/resmenu');
                } else {
                    setLoginError("Gebruiker heeft geen rol, neem contact op met admin");
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError(error.message);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Navbar />
            <Container className="d-flex flex-column align-items-center formwidth">
                <h1 className="centered_title"><i className="bi bi-person-circle"></i> Inloggen</h1>
                
                <div className="card card-width p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label className='form-label'>E-mailadres</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Wachtwoord</Form.Label>
                            <div className="password-input-group">
                                <Form.Control 
                                    type={showPassword ? "text" : "password"} 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={toggleShowPassword} 
                                    className="show-password-btn"
                                >
                                    {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                </Button>
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="submit" className='login_button w-100'>
                            <i className="bi bi-box-arrow-right"></i> Inloggen
                        </Button>
                    </Form>
                </div>

                <div className="card card-width p-4">
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