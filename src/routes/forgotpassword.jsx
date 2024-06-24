import '../styling/Main.css';
import '../styling/Login.css';
import React, { useState } from 'react';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);




  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
        const response = await fetch('http://127.0.0.1:5000/send_password_reset_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                     },
            body: JSON.stringify({ email})
        });

        if (response.ok) { // code : 200-299
            setMessage('Volg de instructies in de e-mail om je wachtwoord te resetten')
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
        <button type="submit" className="login_button"><i class="bi bi-check2-square"></i> Verzend E-mail</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
    </>  
  );

}

export default ForgotPassword;