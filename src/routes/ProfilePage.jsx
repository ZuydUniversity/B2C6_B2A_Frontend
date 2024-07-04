import { useState, useEffect } from 'react';
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
  const [UserId, setUserId] = useState();

  useEffect(() => {
    async function GetAccountInfo(){
      try {
          const authToken = Cookies.get('auth_token');
          if (!authToken) {
              throw new Error('Not authenticated');
          }
          const response = await fetch('http://127.0.0.1:5000/get_account_info', {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json',
                  credentials: "include"
              },
              body: JSON.stringify({ auth_token: authToken })
          });

          if (!response.ok) {
              if(response.status === 500) {
                  throw new Error('Server error, probeer het later opnieuw');
              }
              throw new Error('Error met het authenticeren, probeer het later opniew');
          }

          if (response.ok) {
          
             let data = await response.json();
             let role = data.role;
             let id = data.user_id;
             setUserId(id);
             if(role != 1) {
                 throw new Error('Geen toegang tot deze pagina (rol)');
             }
             else if(patientID != id){
              throw new Error('Geen toegang tot deze pagina (id)');
             }
          }
      } catch (error) {
          console.error('Auth error:', error);
          navigate('/');
      }
  }
  GetAccountInfo();
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5000/get_user/${UserId}`);
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
      const response = await axios.post(`http://localhost:5000/update_user/${UserId}`, {
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
      <Navbar/>
      <div className="container">
        <div className="setting-option">
          <h3>Profiel Informatie</h3>
          {isEditingProfile ? (
            <div>
              <div>
                <label htmlFor="name">Voornaam:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileInfo.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="lastname">Achternaam:</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={profileInfo.lastname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="gender">Geslacht:</label>
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
                <label htmlFor="phone">Telefoonnummer:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={handleCancelEdit}>Cancel</button>
              <button onClick={handleSaveProfile}>Accepteer</button>
            </div>
          ) : (
            <div>
              <p>Voornaam: {profileInfo.name}</p>
              <p>Achternaam: {profileInfo.lastname}</p>
              <p>Geslacht: {profileInfo.gender}</p>
              <p>Email: {profileInfo.email}</p>
              <p>Telefoonnummer: {profileInfo.phone}</p>
              <button onClick={handleEditProfile}>Verander Profiel Informatie</button>
            </div>
          )}
        </div>
        <div className="settings-options">
          <h3>Toegankelijkheids Opties</h3>
          <div>
            <input 
              type="radio" 
              id="normal" 
              name="accessibility" 
              value="1" 
              checked={accessibilityMode === 1} 
              onChange={() => setAccessibilityMode(1)} 
            />
            <label htmlFor="normal">Standaard Modus</label>
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
            <label htmlFor="dark">Donkere Modus</label>
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
            <label htmlFor="protanopia_deuteranopia">Protanopie en Deuteranopie</label>
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
            <label htmlFor="tritanopia">Tritanopie</label>
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
            <label htmlFor="achromatopsia">Achromatopsie</label>
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
            <label htmlFor="high_contrast">Hoge Contrast Modus</label>
          </div>
        </div>
        <div className="settings-option">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
          />
          <label htmlFor="emailNotifications">Email Notificaties</label>
        </div>
      </div>
    </div>
  );
};

export default Settings;