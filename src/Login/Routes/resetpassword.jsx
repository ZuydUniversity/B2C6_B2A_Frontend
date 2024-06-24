import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
                'Content-Type': 'application/json'
                     },
            body: JSON.stringify({ password : new_password})
        });

        if (response.ok) { // code : 200-299
            setMessage('Wachtwoord gereset')
            navigateToLogin();
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
          <label>Nieuwe wachtwoord</label>
          <input type="password" value={new_password} onChange={(e) => setPassword(e.target.value)} required className="login_input" />
        </div>
        <button type="submit" className="login_button"><i class="bi bi-check2-square"></i> Opslaan</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
    </>  
  );

}

export default ResetPassword;