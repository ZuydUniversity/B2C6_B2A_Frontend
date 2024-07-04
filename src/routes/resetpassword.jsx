import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';

function ResetPassword() {
    const [new_password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState(''); // !!!!!
    const [message, setMessage] = useState(null);
    const { token } = useParams();
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (new_password !== confirm_password) {
            setMessage('Wachtwoorden komen niet overeen');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/reset_password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: new_password }),
            });

            if (response.ok) {
                setMessage('Wachtwoord gereset');
                navigateToLogin();
            }

            if (!response.ok) {
                if (response.status === 500) {
                    throw new Error('Server error, probeer het later opnieuw');
                }
                throw new Error('E-mailadres niet gevonden, probeer het opnieuw');
            }
        } catch (error) {
            console.error('Email not found:', error);
            setMessage(error.message);
        }
    };

    return (
        <div className="container mt-5 pb-5">
            <h1 className="centered_title mb-4"><i className="bi bi-question-circle-fill"></i> Wachtwoord resetten</h1>
            <div className="card card-width p-4">
                <Form onSubmit={handleSubmit} className="forget_form">
                    <Form.Group className="mb-4">
                        <Form.Label>Nieuw wachtwoord</Form.Label>
                        <Form.Control type="password" value={new_password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Bevestig nieuw wachtwoord</Form.Label>
                        <Form.Control type="password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </Form.Group>
                    <button type="submit" className="login_button w-100 mb-3 btn"><i className="bi bi-check2-square"></i> Opslaan</button>
                </Form>
            </div>
            {message && (
                <Alert variant="danger" className="mt-3 text-center container">
                    {message}
                </Alert>
                )}
        </div>
       
    );
}

export default ResetPassword;
