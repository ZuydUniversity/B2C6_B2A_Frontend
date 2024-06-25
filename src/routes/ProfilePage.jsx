import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Settings = ({ userId }) => {
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

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5000/get_user/3`);
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
      const response = await axios.post(`http://localhost:5000/update_user/3`, {
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
      <div className="settings-container">
        <div className="setting-option">
          <h3>Profile Information</h3>
          {isEditingProfile ? (
            <div>
              <div>
                <label htmlFor="name">First Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileInfo.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="lastname">Last Name:</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={profileInfo.lastname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="gender">Gender:</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={profileInfo.gender}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileInfo.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={handleCancelEdit}>Cancel</button>
              <button onClick={handleSaveProfile}>Confirm</button>
            </div>
          ) : (
            <div>
              <p>First Name: {profileInfo.name}</p>
              <p>Last Name: {profileInfo.lastname}</p>
              <p>Gender: {profileInfo.gender}</p>
              <p>Email: {profileInfo.email}</p>
              <p>Phone: {profileInfo.phone}</p>
              <button onClick={handleEditProfile}>Edit Profile Information</button>
            </div>
          )}
        </div>
        <div className="settings-options">
          <h3>Accessibility Options</h3>
          <div>
            <input 
              type="radio" 
              id="normal" 
              name="accessibility" 
              value="1" 
              checked={accessibilityMode === 1} 
              onChange={() => setAccessibilityMode(1)} 
            />
            <label htmlFor="normal">Normal Mode</label>
          </div>
          <div>
            <input 
              type="radio" 
              id="dark" 
              name="accessibility" 
              value="2" 
              checked={accessibilityMode === 2} 
              onChange={() => setAccessibilityMode(2)} 
            />
            <label htmlFor="dark">Dark Mode</label>
          </div>
          {/* Add additional accessibility options here with respective values */}
          <div>
            <input
              type="radio"
              id="protanopia_deuteranopia"
              name="accessibility"
              value="3"
              checked={accessibilityMode === 3}
              onChange={() => setAccessibilityMode(3)}
            />
            <label htmlFor="protanopia_deuteranopia">Protanopia and Deuteranopia</label>
          </div>
          <div>
            <input
              type="radio"
              id="tritanopia"
              name="accessibility"
              value="3"
              checked={accessibilityMode === 4}
              onChange={() => setAccessibilityMode(4)}
            />
            <label htmlFor="tritanopia">Tritanopia</label>
          </div>
          <div>
            <input
              type="radio"
              id="achromatopsia"
              name="accessibility"
              value="4"
              checked={accessibilityMode === 5}
              onChange={() => setAccessibilityMode(5)}
            />
            <label htmlFor="achromatopsia">Achromatopsia</label>
          </div>
          <div>
            <input
              type="radio"
              id="achromatomaly"
              name="accessibility"
              value="5"
              checked={accessibilityMode === 6}
              onChange={() => setAccessibilityMode(6)}
            />
            <label htmlFor="achromatomaly">Achromatomaly</label>
          </div>
          <div>
            <input
              type="radio"
              id="high_contrast"
              name="accessibility"
              value="6"
              checked={accessibilityMode === 7}
              onChange={() => setAccessibilityMode(7)}
            />
            <label htmlFor="high_contrast">High Contrast Mode</label>
          </div>
        </div>
        <div className="settings-option">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
          />
          <label htmlFor="emailNotifications">Email Notifications</label>
        </div>
      </div>
    </div>
  );
};

export default Settings;