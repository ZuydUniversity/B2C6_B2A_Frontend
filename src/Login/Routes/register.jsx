import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [accountType, setAccountType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [photo, setPhoto] = useState('');
    const [contact_email, setContactEmail] = useState('');
    const [contact_phone, setContactPhone] = useState('');
    const [contact_name, setContactName] = useState('');
    const [contact_lastname, setContactLastName] = useState('');



    const [message, setMessage] = useState(''); 

    const navigate = useNavigate();

    const navigateToLogin = () => {
      navigate('/'); 
    };

    const register = async (e) => {
        e.preventDefault(); 


        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('accountType', accountType);
        formData.append('specialization', specialization);
        formData.append('gender', gender);
        formData.append('birthDate',birthDate);
        formData.append('phoneNumber', phoneNumber);
        if (photo) {
            formData.append('photo', photo);
        }
        formData.append('contact_email', contact_email);
        formData.append('contact_phone', contact_phone);
        formData.append('contact_name', contact_name);
        formData.append('contact_lastname', contact_lastname);


        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) { 
                if(response.status === 500) {
                    throw new Error('Server error, probeer het later opnieuw');
                }
                throw new Error('E-mailadres is al in gebruik, probeer het opnieuw.');
            }

            setMessage('Registratie successvol');
            navigateToLogin();

        } catch (error) {
            console.error('Registration error:', error);
            setMessage(error.message);
        }

    };
    const changeAccount = (e) => {
        setAccountType(e.target.value);
        setSpecialization('');
        setGender('');
        setBirthDate('');
        setPhoneNumber('');
        setPhoto('');
        setContactEmail('');
        setContactName('');
        setContactPhone('');
        setContactLastName('');
    };


   



    const renderForm = () => {
        switch (accountType) {
            case 'Doctor':
                return (
                <div className="container doctor-register-form">    
                    <div >
                        <div>
                            <label>Specialisatie</label>
                            <input type="text" id="specialization" name="specialization" className='login_input' value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
                        </div>
                        <div>
                            <label>Telefoonnummer</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" className='login_input' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                    </div>
                </div>    
                );
            case 'Patient':
                return (
                    <div className="formdiv patient-register-form">
                        <div>
                            <label>Geslacht</label>
                            <input type="text" id="gender" name="gender" className='login_input' value={gender} onChange={(e) => setGender(e.target.value)} required />
                        </div>
                        <div>
                            <label>Geboortedatum</label>
                            <input type="date" id="birthday" name="birthday" className='login_input' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                        </div>
                        <div>
                            <label>Telefoonnummer</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" className='login_input' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                        <div>
                            <label>Contactpersoon Naam</label>
                            <input type="text" id="contactfirstName" name="contactfirstName" className='login_input' value={contact_name} onChange={(e) => setContactName(e.target.value)}  />
                        </div>
                        <div>
                            <label>Contactpersoon Achternaam</label>
                            <input type="text" id="contactlastName" name="contactlastName" className='login_input' value={contact_lastname} onChange={(e) => setContactLastName(e.target.value)}  />
                        </div>
                        <div>
                            <label>Contactpersoon E-mailadres</label>
                            <input type="email" id="contactemail" name="contactemail" className='login_input' value={contact_email} onChange={(e) => setContactEmail(e.target.value)}  />
                        </div>
                        <div>
                            <label>Contactpersoon Telefoonnummer</label>
                            <input type="tel" id="contactphoneNumber" name="contactphoneNumber" className='login_input' value={contact_phone} onChange={(e) => setContactPhone(e.target.value)}  />
                        </div>
                    </div>
                );
            case 'Admin':
                return (
                    <div>
                        <div>
                            
                        </div>
                    </div>
                );
            case 'Researcher':
                return (
                    <div>
                        <div>
                            
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
    <div> 
        <h1 className="centered-title"><i className="bi bi-person-plus-fill"></i> Account aanmaken</h1>
        <div className='formdiv'>
          <form onSubmit={register}>
            <div className='register_style'>
                <div className='register_form'>
                    <div className='register_left'>
                        <div style={{marginBottom: '20px'}}>
                        <label>Accounttype</label>
                        <select value={accountType} onChange={changeAccount} required>
                            <option value="" disabled>Selecteer een accounttype</option>
                            <option value="Doctor">Dokter</option>
                            <option value="Patient">Patiënt</option>
                            <option value="Admin">Beheerder</option>
                            <option value="Researcher">Onderzoeker</option>
                        </select>
                        </div>
                        <div>
                            <label>Voornaam</label>
                            <input type="text" id="firstName" name="firstName" className='login_input' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Achternaam</label>
                            <input type="text" id="lastName" name="lastName" className='login_input' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div>
                            <label>E-mailadres</label>
                            <input type="email" id="email" name="email" className='login_input' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label>Wachtwoord</label>
                            <input type="password" id="password" name="password" className='login_input' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <label>Profielfoto</label>
                            <input type="file" accept=".jpg,.jpeg,.png" id="photo" name="photo" className='login_input' onChange={(e) => setPhoto(e.target.files[0])}  />
                        </div>
                    </div>
                    <div className='register_right'>
                        {accountType && renderForm()}
                    </div>
                </div>
                <button type="submit" className='login_button'><i className="bi bi-person-plus-fill"></i> Registreren</button>
            </div>
          </form>
          
          {message && <p>{message}</p>}
        </div>
        
    </div>    
      );
}

export default Register;