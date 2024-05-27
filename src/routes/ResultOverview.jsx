// src/MyPage.js
import React from 'react';
import './ResultOverview.css'; // Import the CSS file
import Navbar from '../components/Navbar'; //double period to go back one directory

function ResultOverview() {
  return (
     <div className="ResultOverview">
      <Navbar />
      <h1>Welcome to My Page</h1>
      <p>This is a new React page with CSS styling.</p>
    </div>
  );
}

export default ResultOverview;
