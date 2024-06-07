import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar';

const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'

            });

            if (!response.ok) { 
                if(response.status === 500) {
                    throw new Error('Server error, probeer het later opnieuw');
                }
                throw new Error('Inloggen mislukt, probeer het opnieuw');
            }
            
            const data = await response.json();
            

            if (response.ok) { // code : 200-299
                setLoginError('Inloggen successvol');   
                if(data.role == 1){ 
                    navigate('/docmenu', { state: {email, role : data.role }});               
                }
                else if(data.role == 2){ 
                    navigate('/patmenu', { state: {email, role : data.role }});
                }
                else if(data.role == 3){ 
                    navigate('/adminmenu', { state: {email, role : data.role }});               
                }
                else if(data.role == 4){ 
                    navigate('/resmenu', { state: {email, role : data.role }});
                }
                else{
                    setLoginError("Gebruiker heeft geen rol, neem contact op met admin")
                }
            }

        } catch (error) {
            console.error('Login error:', error);
            setLoginError(error.message)
        }
    };

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