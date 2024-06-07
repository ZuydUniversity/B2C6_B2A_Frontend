import React, { useEffect, useState } from 'react';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scriptsLoaded, setScriptsLoaded] = useState(false);

    useEffect(() => {
        const addScript = (src, integrity, crossOrigin, callback) => {
            const script = document.createElement('script');
            script.src = src;
            script.integrity = integrity;
            script.crossOrigin = crossOrigin;
            script.async = true;
            script.onload = callback;
            document.body.appendChild(script);
        };

        const onScriptLoad = () => {
            console.log('Script zijn geladen en uitgevoerd.');
            setScriptsLoaded(true);
        };

        if (!scriptsLoaded) {
            addScript(
                'https://code.jquery.com/jquery-3.3.1.slim.min.js',
                'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo',
                'anonymous',
                () => {
                    addScript(
                        'https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js',
                        'sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49',
                        'anonymous',
                        () => {
                            addScript(
                                'https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js',
                                'sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy',
                                'anonymous',
                                onScriptLoad
                            );
                        }
                    );
                }
            );
        }
    }, [scriptsLoaded]);

    return (
        <nav className="navbar navbar-expand-lg border-bottom">
            <div className="navbar-container">
                <button className="btn btn-outline-primary navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-list custom-icon"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <Link to="/"><button type="button" className="btn btn-outline-primary"><i className="bi bi-house-fill"></i> Home</button></Link>
                        <Link to="/PatientOverview"><button type="button" className="btn btn-outline-primary"><i className="bi bi-people-fill"></i> Patiëntenoverzicht</button></Link>
                        <button type="button" className="btn btn-outline-primary"><i className="bi bi-file-check-fill"></i> Resultaten</button>
                        <Link to="/Kalender"><button type="button" className="btn btn-outline-primary"><i className="bi bi-calendar-event-fill"></i> Kalender</button></Link>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <div className="dropdown">
                            <button type="button" className="btn btn-outline-primary" id="dropdownSearchButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="bi bi-search"></i> Zoeken</button>
                            <div className="dropdown-menu p-3" aria-labelledby="dropdownSearchButton">
                                <form className="form-inline d-flex">
                                    <input className="form-control mr-1" type="search" placeholder="Zoeken..." aria-label="Zoeken" />
                                    <button className="btn btn-outline-primary mr-0" type="submit"><i className="bi bi-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="dropdown">
                            <button type="button" className="btn btn-outline-primary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="bi bi-person-circle"></i> Profiel</button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#"><i className="bi bi-person-bounding-box"></i> Profielweergave</a>
                                <a className="dropdown-item" href="#"><i className="bi bi-gear-fill"></i> Profielinstellingen</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#"><i className="bi bi-box-arrow-left"></i> Uitloggen</a>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
