import React from 'react';
import './Afsprakenoverzicht.css'; 

const Afsprakenoverzicht = () => {
  return (
    <div className="afsprakenoverzicht">
      <table>
        <thead>
          <tr>
            <th>Naam</th>
            <th>Type</th>
            <th>Datum</th>
            <th>Acties</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Joep Doe</td>
            <td>Myometrie</td>
            <td>21/05/2024 14:30</td>
            <td>
              <button>Bekijk</button>
              <button>Bewerk</button>
              <button>Verwijder</button>
            </td>
          </tr>
          <tr>
            <td>Elisa van Winkel</td>
            <td>Radiologie</td>
            <td>21/05/2024 16:00</td>
            <td>
              <button>Bekijk</button>
              <button>Bewerk</button>
              <button>Verwijder</button>
            </td>
          </tr>
          {/* Voeg meer rijen toe zoals nodig */}
        </tbody>
      </table>
    </div>
  );
};

export default Afsprakenoverzicht;