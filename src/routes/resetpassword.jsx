import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function ResetPassword() {
    const [new_password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const { token } = useParams();
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    <Form.Group className="mb-3">
                        <Form.Label>Nieuw wachtwoord</Form.Label>
                        <Form.Control type="password" value={new_password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary"><i className="bi bi-check2-square"></i> Opslaan</Button>
                </Form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;
