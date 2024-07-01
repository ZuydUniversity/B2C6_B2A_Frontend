import '../styling/Main.css';
import '../styling/Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Register() {
    const [accountType, setAccountType]= useState('Patient');
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
        formData.append('birthDate', birthDate);
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
                if (response.status === 500) {
                    throw new Error('Server error, probeer het later opnieuw');
                }
                throw new Error('E-mailadres is al in gebruik, probeer het opnieuw.');
            }

            setMessage('Registratie succesvol');
            navigateToLogin();

        } catch (error) {
            console.error('Registratie fout:', error);
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

    const renderDoctorFields = () => {
        return (
            <>
                <div className="col-md-6 mb-3">
                    <label htmlFor="specialization" className="form-label">Specialisatie</label>
                    <select id="specialization" name="specialization" className="form-control" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required>
                        <option value="">Selecteer een specialisatie...</option>
                        <option value="Algemene Geneeskunde">Algemene Geneeskunde</option>
                        <option value="Cardiologie">Cardiologie</option>
                        <option value="Chirurgie">Chirurgie</option>
                        <option value="Dermatologie">Dermatologie</option>
                        <option value="Fysiotherapeut">Fysiotherapeut</option>
                        <option value="Gynaecologie">Gynaecologie</option>
                        <option value="Neurologie">Neurologie</option>
                        <option value="Oogheelkunde">Oogheelkunde</option>
                        <option value="Orthopedie">Orthopedie</option>
                        <option value="Pediatrie">Pediatrie</option>
                        <option value="Psychiatrie">Psychiatrie</option>
                        <option value="Radiologie">Radiologie</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Telefoonnummer</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
            </>
        );
    };

    const renderPatientFields = () => {
        return (
            <>
                <div className="col-md-6 mb-3">
                    <label htmlFor="gender" className="form-label">Geslacht</label>
                    <select id="gender" name="gender" className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="">Selecteer geslacht...</option>
                        <option value="Man">Man</option>
                        <option value="Vrouw">Vrouw</option>
                        <option value="Anders">Anders</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="birthDate" className="form-label">Geboortedatum</label>
                    <input type="date" id="birthDate" name="birthDate" className="form-control" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="contact_name" className="form-label">Contactpersoon Naam</label>
                    <input type="text" id="contact_name" name="contact_name" className="form-control" value={contact_name} onChange={(e) => setContactName(e.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="contact_lastname" className="form-label">Contactpersoon Achternaam</label>
                    <input type="text" id="contact_lastname" name="contact_lastname" className="form-control" value={contact_lastname} onChange={(e) => setContactLastName(e.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="contact_email" className="form-label">Contactpersoon E-mailadres</label>
                    <input type="email" id="contact_email" name="contact_email" className="form-control" value={contact_email} onChange={(e) => setContactEmail(e.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="contact_phone" className="form-label">Contactpersoon Telefoonnummer</label>
                    <input type="tel" id="contact_phone" name="contact_phone" className="form-control" value={contact_phone} onChange={(e) => setContactPhone(e.target.value)} />
                </div>
            </>
        );
    };

    return (
        <div className="container mt-5 pb-5">
            <h1 className="centered_title mb-4"><i className="bi bi-person-plus-fill"></i> Account aanmaken</h1>
            <div className="card card-width p-4">
                <form onSubmit={register}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                        </div>
                    </div>                   <div className="row mb-3">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName" className="form-label">Voornaam</label>
                            <input type="text" id="firstName" name="firstName" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="lastName" className="form-label">Achternaam</label>
                            <input type="text" id="lastName" name="lastName" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">E-mailadres</label>
                            <input type="email" id="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="password" className="form-label">Wachtwoord</label>
                            <input type="password" id="password" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="photo" className="form-label">Profielfoto</label>
                            <input type="file" accept=".jpg,.jpeg,.png" id="photo" name="photo" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        {accountType === 'Doctor' && renderDoctorFields()}
                        {accountType === 'Patient' && renderPatientFields()}
                    </div>
                    <Button variant="secondary" type='submit' className='login_button w-100 mb-2'>
                            <i className="bi bi-person-plus-fill"></i> Registreren
                    </Button>
                </form>
                </div>
                    <div className="card card-width p-4">
                        <Button variant="secondary" type="button" className='login_button w-100' onClick={() => window.history.back()}>
                            <i className="bi bi-arrow-left"></i> Terug
                        </Button>
                    {message && <p className="mt-3 text-center">{message}</p>}
                </div>
        </div>
    );
}
export default Register;