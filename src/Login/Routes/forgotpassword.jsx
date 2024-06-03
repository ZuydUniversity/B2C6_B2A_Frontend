import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [message, setMessage] = useState(null);




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

        if (response.ok) { // code : 200-299
            setMessage('Wachtwoord is veranderd')
        }


        if (!response.ok) { 
          if(response.status === 500) {
              throw new Error('Server error, probeer het later opnieuw');
          }
          throw new Error('E-mailadres niet gevonden, probeeer het opnieuw');
      }
    } catch (error) {
      console.error('Email not found:', error);
      setMessage(error.message)
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