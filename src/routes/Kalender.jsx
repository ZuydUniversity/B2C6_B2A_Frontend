import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import TopPage from '../components/TopPage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Kalender() {
    const navigate = useNavigate();
    const [showWeekCalendar, setShowWeekCalendar] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const handleWeekButtonClick = () => {
        setShowWeekCalendar(true);
    };

    const handleMonthButtonClick = () => {
        setShowWeekCalendar(false);
    };

    const handleDayButtonClick = () => {
        // Handle day button click
        console.log('Dag button clicked');
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionChange = (type) => {
        // Handle selecting type option
        console.log('Selected type:', type);
    };

    const customDayRenderer = ({ date, view }) => {
        if (view === 'month' && date.getDate() === 3 && date.getMonth() === 5) {
            return (
                <button onClick={() => handleAppointmentClick(date)} className="appointment-button">
                    10:00 Joep Doe
                </button>
            );
        }
        return null;
    };

    const DataTable = () => (
        <>
            <table className="calendar-datatable">
                <thead>
                    <tr>
                        <th className="image-header"></th>
                        <th className="spacer"></th>
                        <th className="th-header-left">
                            <div className="header-rounded-left header-item">
                                <button className="header-button" onClick={handleMonthButtonClick}>Maand</button>
                            </div>
                        </th>
                        <th className="th-header-middle">
                            <div className="header-rounded-middle header-item">
                                <button className="header-button" onClick={handleWeekButtonClick}>Week</button>
                            </div>
                        </th>
                        <th className="th-header-middle">
                            <div className="header-rounded-middle header-item">
                                <button className="header-button" onClick={handleDayButtonClick}>Dag</button>
                            </div>
                        </th>
                        <th className="th-header-middle">
                        <div className="header-dropdown">
                                <button className="header-button" onClick={handleDropdownToggle}>Selecteer type</button>
                                {dropdownOpen && (
                                    <div className="dropdown-content">
                                        <button onClick={() => handleOptionChange('Radiologie')} className="header-button">Radiologie</button>
                                        <button onClick={() => handleOptionChange('Myometrie')} className="header-button">Myometrie</button>
                                    </div>
                                )}
                            </div>
                        </th>
                        <th className="th-header-right">
                            <div className="header-rounded-right header-item">
                                <button className="header-button">Nieuwe Afspraak</button>
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>

            <div className="calendar-container">
                {showWeekCalendar ? <WeekCalendar /> : <MonthCalendar />}
            </div>
        </>
    );

    const WeekCalendar = () => <Calendar view="week" />;
    const MonthCalendar = () => <Calendar tileContent={customDayRenderer} />;

    return (
        <>
            <Navbar />
            <TopPage headerName="Kalender" />
            <div className="content">
                <DataTable />
            </div>
            {/* Rounded square */}
            <div className="rounded-square"></div>
        </>
    );
}

export default Kalender;
