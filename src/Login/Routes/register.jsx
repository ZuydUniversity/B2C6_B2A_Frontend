import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [accountType, setAccountType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [patientNumber, setPatientNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [photo, setPhoto] = useState('');

    const [message, setMessage] = useState(''); 

    const navigate = useNavigate();

    const navigateToLogindaan = () => {
      navigate('/logindaan'); 
    };

    const register = async (e) => {
        e.preventDefault(); 


        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('accountType', accountType);
        formData.append('employeeNumber', employeeNumber);
        formData.append('specialization', specialization);
        formData.append('patientNumber', patientNumber);
        formData.append('gender', gender);
        formData.append('birthDate',birthDate);
        formData.append('phoneNumber', phoneNumber);
        formData.append('photo', photo);

        try {
            const response = await fetch('/register', {
                method: 'POST',
                body: formData,
            });
            

            if(response.status === 400) {
                throw new Error('Email already in use. Try again.');
            }
            else if (!response.ok) {
                throw new Error('Registration failed. Please refresh the page and try again.    ');
            }

            setMessage('Registration successful');
            navigateToLogindaan();

        } catch (error) {
            console.error('Registration error:', error);
            setMessage('Registration failed, email aready in use. Try again.');
        }

    };
    const changeAccount = (e) => {
        setAccountType(e.target.value);
        setEmployeeNumber('');
        setSpecialization('');
        setPatientNumber('');
        setGender('');
        setBirthDate('');
        setPhoneNumber('');
        setPhoto('');
    };


   



    const renderForm = () => {
        switch (accountType) {
            case 'Doctor':
                return (
                    <div className="formdiv">
                        <div>
                            <label>Personeelsnummer</label>
                            <input type="number" id="employeeNumber" name="employeeNumber" value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} required />
                        </div>
                        <div>
                            <label>Specialisatie</label>
                            <input type="text" id="specialization" name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
                        </div>
                        <div>
                            <label>Telefoonnummer</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                    </div>
                );
            case 'Patient':
                return (
                    <div className="formdiv">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label>Patiëntnummer</label>
                            <input type="number" id="patientNumber" name="patientNumber" value={patientNumber} onChange={(e) => setPatientNumber(e.target.value)} required />
                        </div>
                        <div>
                            <label>Geslacht</label>
                            <input type="text" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required />
                        </div>
                        <div>
                            <label>Geboortedatum</label>
                            <input type="date" id="birthday" name="birthday" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                        </div>
                        <div>
                            <label>Telefoonnummer</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
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
        <h1 className="centered-title"><i className="bi bi-person-circle"></i> Account aanmaken</h1>
        <div className='formdiv'>
          <form onSubmit={register}>
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
              <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div>
              <label>Achternaam</label>
              <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div>
              <label>E-mailadres</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Wachtwoord</label>
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Profielfoto</label>
                <input type="file" accept=".jpg,.jpeg,.png" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0])} required />
            </div>
            {accountType && renderForm()}
            <button type="submit"><i className="bi bi-person-plus-fill"></i> Registreren</button>
          </form>
          
          {message && <p>{message}</p>}
        </div>
    </div>    
      );
}

export default Register;