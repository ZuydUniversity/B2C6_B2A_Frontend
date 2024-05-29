import React from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = ({ message }) => {
    return (
        <div>
            <h1 className="centered-title"><i className="bi bi-person-circle"></i> Loginpagina</h1>

            <div className="formdiv">
                <form action="/" method="POST">
                    <label htmlFor="email"><i className="bi bi-envelope-at-fill"></i> E-mailadres</label><br />
                    <input type="email" id="email" name="email" /><br />
                    <label htmlFor="password"><i className="bi bi-key-fill"></i> Wachtwoord</label><br />
                    <input type="password" id="password" name="password" /><br />
                    <button type="submit"><i className="bi bi-box-arrow-right"></i> Inloggen</button>
                </form>
            </div> 

            <div className="formdiv">
                <form action="/create" method="GET">
                    <button type="submit"><i className="bi bi-person-plus-fill"></i> Account aanmaken</button>
                </form>
                <form action="/forgot-password" method="GET">
                    <button type="submit"><i className="bi bi-question-circle-fill"></i> Wachtwoord vergeten?</button>
                </form>
            </div>

            <div className="bottom-right-text">Klas B2A</div>
        </div>
    );
};

export default App;