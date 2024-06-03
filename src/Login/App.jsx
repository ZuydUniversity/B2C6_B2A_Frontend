// import React from 'react';
// import './App.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const App = ({ message }) => {
//     return (
//         <div>
//             <h1 className="centered-title"><i className="bi bi-person-circle"></i> Loginpagina</h1>

//             <div className="login_style">
//                 <form action="/" method="POST">
//                     <label htmlFor="email"><i className="bi bi-envelope-at-fill"></i> E-mailadres</label><br />
//                     <input type="email" id="email" name="email" className='login_input'/><br />
//                     <label htmlFor="password"><i className="bi bi-key-fill"></i> Wachtwoord</label><br />
//                     <input type="password" id="password" name="password" className='login_input' /><br />
//                     <button type="submit"className='login_button'><i className="bi bi-box-arrow-right"></i> Inloggen</button>
//                 </form>
//             </div> 

//             <div className="login_style">
//                 <form action="/register" method="GET">
//                     <button type="submit" className='login_button'><i className="bi bi-person-plus-fill"></i> Account aanmaken</button>
//                 </form>
//                 <form action="/forgot-password" method="GET">
//                     <button type="submit"className='login_button'><i className="bi bi-question-circle-fill"></i> Wachtwoord vergeten?</button>
//                 </form>
//             </div>

//             <div className="bottom-right-text" style={{ whiteSpace: 'pre-wrap' }}>
//                 {`Mogelijk gemaakt door: \n \t \t      Klas B2A`}
//             </div>
//         </div>
//     );
// };

// export default App;

// NIEUWE CODE --> samengevoegde code van Daan en Alens

import React, { useState } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) { 
                throw new Error('Inloggen mislukt, probeer het opnieuw');
            }

            if (response.ok) { // code : 200-299
                setLoginError('Inloggen successvol')
            }

        } catch (error) {
            console.error('Login error:', error);
            setLoginError('Inloggen mislukt, probeer het opnieuw')
        }
    };

    return (
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
    );
};

export default App;