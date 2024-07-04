import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [userId, setUserId] = useState(null); // Initialize userId state
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(1);
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    lastname: '',
    gender: '',
    email: '',
    phone: '',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function GetAccountInfo() {
      try {
        const authToken = Cookies.get('auth_token');
        if (!authToken) {
          throw new Error('Not authenticated');
        }
        
        const response = await fetch('http://127.0.0.1:5000/get_account_info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
          },
          body: JSON.stringify({ auth_token: authToken }),
        });

        if (!response.ok) {
          if (response.status === 500) {
            throw new Error('Server error, probeer het later opnieuw');
          }
          throw new Error('Error met het authenticeren, probeer het later opniew');
        }

        const data = await response.json();
        const id = data.user_id; // Assuming user_id is available in the response
        setUserId(id); // Set userId in state after fetching it
      } catch (error) {
        throw error;
      }
    }

    GetAccountInfo();
  }, [navigate]); 

  useEffect(() => {
    const fetchUser = async (id) => {
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

    if (userId) {
      fetchUser(userId);
    }
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
        alert('Settings updated successfully.');
        setIsEditingProfile(false);
      } else {
        alert('Failed to update settings.');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings.');
    }
  };

  return (
    <div className={`content accessibility-mode-${accessibilityMode}`}>
      <Navbar />
      <div className="container formwidth">
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Profiel Informatie</h3>
                {isEditingProfile ? (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Voornaam:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={profileInfo.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastname" className="form-label">Achternaam:</label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        className="form-control"
                        value={profileInfo.lastname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">Geslacht:</label>
                      <input
                        type="text"
                        id="gender"
                        name="gender"
                        className="form-control"
                        value={profileInfo.gender}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={profileInfo.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Telefoonnummer:</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={profileInfo.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button className="btn btn-outline-primary me-2" onClick={handleCancelEdit}>Cancel</button>
                    <button className="btn btn-outline-primary" onClick={handleSaveProfile}>Accepteer</button>
                  </div>
                ) : (
                  <div>
                    <p>Voornaam: {profileInfo.name}</p>
                    <p>Achternaam: {profileInfo.lastname}</p>
                    <p>Geslacht: {profileInfo.gender}</p>
                    <p>Email: {profileInfo.email}</p>
                    <p>Telefoonnummer: {profileInfo.phone}</p>
                    <button className="btn btn-outline-primary" onClick={handleEditProfile}>Verander Profiel Informatie</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Toegankelijkheids Opties</h3>
                <div className="form-check">
                  <input 
                    type="radio" 
                    id="normal" 
                    name="accessibility" 
                    value="1" 
                    className="form-check-input"
                    checked={accessibilityMode === 1} 
                    onChange={() => setAccessibilityMode(1)} 
                  />
                  <label htmlFor="normal" className="form-check-label">Standaard Modus</label>
                </div>
                <div className="form-check">
                  <input 
                    type="radio" 
                    id="dark" 
                    name="accessibility" 
                    value="2" 
                    className="form-check-input"
                    checked={accessibilityMode === 2} 
                    onChange={() => setAccessibilityMode(2)} 
                  />
                  <label htmlFor="dark" className="form-check-label">Donkere Modus</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="protanopia_deuteranopia"
                    name="accessibility"
                    value="3"
                    className="form-check-input"
                    checked={accessibilityMode === 3}
                    onChange={() => setAccessibilityMode(3)}
                  />
                  <label htmlFor="protanopia_deuteranopia" className="form-check-label">Protanopie en Deuteranopie</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="tritanopia"
                    name="accessibility"
                    value="4"
                    className="form-check-input"
                    checked={accessibilityMode === 4}
                    onChange={() => setAccessibilityMode(4)}
                  />
                  <label htmlFor="tritanopia" className="form-check-label">Tritanopie</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="achromatopsia"
                    name="accessibility"
                    value="5"
                    className="form-check-input"
                    checked={accessibilityMode === 5}
                    onChange={() => setAccessibilityMode(5)}
                  />
                  <label htmlFor="achromatopsia" className="form-check-label">Achromatopsie</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="achromatomaly"
                    name="accessibility"
                    value="6"
                    className="form-check-input"
                    checked={accessibilityMode === 6}
                    onChange={() => setAccessibilityMode(6)}
                  />
                  <label htmlFor="achromatomaly" className="form-check-label">Achromatomaly</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="high_contrast"
                    name="accessibility"
                    value="7"
                    className="form-check-input"
                    checked={accessibilityMode === 7}
                    onChange={() => setAccessibilityMode(7)}
                  />
                  <label htmlFor="high_contrast" className="form-check-label">Hoge Contrast Modus</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    className="form-check-input"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  <label htmlFor="emailNotifications" className="form-check-label">Email Notificaties</label>
                </div>
                <button className="btn btn-outline-primary mt-2" onClick={handleSaveProfile}>Opties opslaan</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
