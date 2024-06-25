import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Settings = ({ userId }) => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(1);
  const [profileInfo, setProfileInfo] = useState({
    name: 'Arts',
    lastname: 'Achternaam',
    gender: 'Man',
    email: 'Arts@outlook.com',
    phone: '+31 06 1763518',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5000/get_user/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        const user = {
          name: userData.Name,
          lastname: userData.Lastname,
          gender: userData.Gender,
          email: userData.Email,
          phone: userData.Phone_number,
        };
        setProfileInfo(user);
        setEmailNotifications(userData.EmailNotifications);
        setAccessibilityMode(userData.AccessibilityMode);
      } catch (error) {
        console.error(`Failed to fetch user: ${error}`);
      }
    };

    fetchUser(userId);
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/update_user/${userId}`, {
        Name: profileInfo.name,
        Lastname: profileInfo.lastname,
        Gender: profileInfo.gender,
        Email: profileInfo.email,
        Phone_number: profileInfo.phone,
        AccessibilityMode: accessibilityMode,
        EmailNotifications: emailNotifications,
      });
      if (response.status === 200) {
        alert('Instellingen succesvol bijgewerkt.');
        setIsEditingProfile(false);
      } else {
        alert('Instellingen bijwerken mislukt.');
      }
    } catch (error) {
      console.error('Fout bij het bijwerken van instellingen:', error);
      alert('Fout bij het bijwerken van instellingen.');
    }
  };

  return (
    <div className={`content accessibility-mode-${accessibilityMode}`}>
      <Navbar />
      <div className="container formwidth">
      <h1 className="centered_title"><i className="bi bi-person-bounding-box"></i> Profielweergave</h1>
        <div className="row">
          <div className="col-lg-6">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title mb-4">Profiel informatie</h3>
                {isEditingProfile ? (
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Voornaam:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={profileInfo.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastname" className="form-label">Achternaam:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        value={profileInfo.lastname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">Geslacht:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={profileInfo.gender}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={profileInfo.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Telefoonnummer:</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={profileInfo.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button type="button" className="btn btn-outline-primary me-2" onClick={handleCancelEdit}>Annuleren</button>
                    <button type="button" className="btn btn-outline-primary" onClick={handleSaveProfile}>Opslaan</button>
                  </form>
                ) : (
                  <div>
                    <p>Voornaam: {profileInfo.name}</p>
                    <p>Achternaam: {profileInfo.lastname}</p>
                    <p>Geslacht: {profileInfo.gender}</p>
                    <p>Email: {profileInfo.email}</p>
                    <p>Telefoonnummer: {profileInfo.phone}</p>
                    <button type="button" className="btn btn-outline-primary" onClick={handleEditProfile}>Bewerk Profiel</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title mb-4">Toegankelijkheids opties</h3>
                <div className="mb-3">
                  <input
                    type="radio"
                    id="normal"
                    name="accessibility"
                    value="1"
                    className="form-check-input me-1"
                    checked={accessibilityMode === 1}
                    onChange={() => setAccessibilityMode(1)}
                  />
                  <label htmlFor="normal" className="form-check-label">Standaard Modus</label>
                </div>
                <div className="mb-3">
                  <input
                    type="radio"
                    id="dark"
                    name="accessibility"
                    value="2"
                    className="form-check-input me-1"
                    checked={accessibilityMode === 2}
                    onChange={() => setAccessibilityMode(2)}
                  />
                  <label htmlFor="dark" className="form-check-label">Donkere Modus</label>
                </div>
                {/* Additional accessibility options */}
                <div className="mb-3">
                  <input
                    type="radio"
                    id="protanopia_deuteranopia"
                    name="accessibility"
                    value="3"
                    className="form-check-input me-1"
                    checked={accessibilityMode === 3}
                    onChange={() => setAccessibilityMode(3)}
                  />
                  <label htmlFor="protanopia_deuteranopia" className="form-check-label">Protanopie en Deuteranopie</label>
                </div>
                <div className="mb-3">
                  <input
                    type="radio"
                    id="tritanopia"
                    name="accessibility"
                    value="4"
                    className="form-check-input me-1"
                    checked={accessibilityMode === 4}
                    onChange={() => setAccessibilityMode(4)}
                  />
                  <label htmlFor="tritanopia" className="form-check-label">Tritanopie</label>
                </div>
                <div className="mb-3">
                  <input
                    type="radio"
                    id="achromatopsia"
                    name="accessibility"
                    value="5"
                    className="form-check-input me-1"
                    checked={accessibilityMode === 5}
                    onChange={() => setAccessibilityMode(5)}
                  />
                  <label htmlFor="achromatopsia" className="form-check-label">Achromatopsie</label>
                </div>
                <div className="mb-3">
                  <input
                    type="radio"
                    id="achromatomaly"
                    name="accessibility"
                    value="6"
                    className="form-check-input me-1"
                    checked={accessibilityMode === 6}
                    onChange={() => setAccessibilityMode(6)}
                  />
                  <label htmlFor="achromatomaly" className="form-check-label">Achromatomaly</label>
                </div>
                <div className="mb-3">
                  <input
                    type="radio"
                    id="high_contrast"
                    name="accessibility"
                    value="7"
                    className="form-check-input me-1"
                    checked={accessibilityMode === 7}
                    onChange={() => setAccessibilityMode(7)}
                  />
                  <label htmlFor="high_contrast" className="form-check-label">Hoge Contrast Modus</label>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input me-1"
                    id="emailNotifications"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  <label htmlFor="emailNotifications" className="form-check-label">Email Notificaties</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
