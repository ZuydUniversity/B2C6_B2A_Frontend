import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/send_password_reset_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('Volg de instructies in de e-mail om je wachtwoord te resetten');
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
                        <Form.Label>E-mailadres</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Button type="submit" className="login_button w-100 mb-2"><i className="bi bi-check2-square"></i> Verzend E-mail</Button>
                    <Button variant="secondary" type="button" className='login_button w-100' onClick={() => window.history.back()}>
                        <i className="bi bi-arrow-left"></i> Terug
                    </Button>
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

export default ForgotPassword;
