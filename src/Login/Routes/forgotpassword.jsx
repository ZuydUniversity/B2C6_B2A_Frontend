import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [message, setMessage] = useState(null);




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
        setMessage('Passwords do not match, try again');
        return;
    }

    try {
        const response = await fetch('/forgotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                     },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) { // code : 200-299
            setMessage('Password changed!')
        }

        if (!response.ok) { 
            throw new Error('Email not found, try again');
        }
    } catch (error) {
      console.error('Email not found:', error);
      setMessage('Email not found, try again')
    }
  }

  return (
    <>
    <h1 className="centered-title"><i className="bi bi-question-circle-fill"></i> Wachtwoord resetten</h1>
    <div className="login_style">
      <form onSubmit={handleSubmit} className="forget_form">
        <div>
          <label>E-mailadres</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="login_input" />
        </div>
        <div>
          <label>Nieuw wachtwoord</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="login_input" />
        </div>
        <div>
          <label>Herhaal nieuw wachtwoord</label>
          <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required className="login_input" />
        </div>
        <button type="submit" className="login_button"><i class="bi bi-check2-square"></i> Opslaan</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
    </>  
  );

}

export default Login;