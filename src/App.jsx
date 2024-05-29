import React, { useState } from 'react';
import './Login/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <Navbar />
            <h1>Welcome to the Home Page</h1>
            <div>
                <h1 className="centered-title"><i className="bi bi-person-circle"></i> Loginpagina</h1>

                <div className="login_style">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email"><i className="bi bi-envelope-at-fill"></i> E-mailadres</label><br />
                        <input type="email" id="email" name="email" className='login_input' value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                        <label htmlFor="password"><i className="bi bi-key-fill"></i> Wachtwoord</label><br />
                        <input type="password" id="password" name="password" className='login_input' value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                        <button type="submit" className='login_button'><i className="bi bi-box-arrow-right"></i> Inloggen</button>
                    </form>
                </div> 

                <div className="login_style">
                    <form action="/register" method="GET">
                        <button type="submit" className='login_button'><i className="bi bi-person-plus-fill"></i> Account aanmaken</button>
                    </form>
                    <form action="/forgot-password" method="GET">
                        <button type="submit" className='login_button'><i className="bi bi-question-circle-fill"></i> Wachtwoord vergeten?</button>
                    </form>
                </div>

                <div className="bottom-right-text" style={{ whiteSpace: 'pre-wrap' }}>
                    {`Mogelijk gemaakt door \n \t \t     Klas B2A`}
                </div>

                {loginError && <p>{loginError}</p>}
            </div>
        </>
    );
};

export default App;