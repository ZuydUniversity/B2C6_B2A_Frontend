import '../styling/Main.css';
import '../styling/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1>Welkom bij het ArtsenDashboard</h1>
                <div className="row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;