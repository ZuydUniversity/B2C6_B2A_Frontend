import React, { useState } from 'react';
import Navbar from '../components/Navbar';
<<<<<<< Updated upstream
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
=======
import TopPage from '../components/TopPage';

function Kalender() {
    const [showWeekCalendar, setShowWeekCalendar] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showNewAppointment, setShowNewAppointment] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleWeekButtonClick = () => {
        setShowWeekCalendar(true);
        setShowNewAppointment(false); // Hide new appointment on week view
>>>>>>> Stashed changes
    };

    const handleMonthButtonClick = () => {
        setShowWeekCalendar(false);
<<<<<<< Updated upstream
    };

    const handleDayButtonClick = () => {
        // Handle day button click
        console.log('Dag button clicked');
=======
        setShowNewAppointment(false); // Hide new appointment on month view
        // Reset any other state variables if needed
    };

    const handleDayButtonClick = () => {
        console.log('Dag button clicked');
        setShowWeekCalendar(false);
        setShowNewAppointment(false); // Hide new appointment on day view
    };

    const handleNewAppointmentButtonClick = () => {
        setShowNewAppointment(true);
>>>>>>> Stashed changes
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionChange = (type) => {
<<<<<<< Updated upstream
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
=======
        console.log('Selected type:', type);
    };

    const renderGridItems = () => {
        const startingDayIndex = 5; // Assuming Saturday is the 6th day of the week (0-indexed)
        const items = [];
        let dayNumber = 1;

        const appointments = {
            1: ["10:00u John Doe", "14:00u Jane Smith"],
            2: [],
            3: ["11:00u Carol White", "15:00u Dave Black"],
            4: ["08:00u Eve Green", "16:00u Frank Blue"],
            5: ["12:00u Grace Pink", "17:00u Hank Yellow"],
            6: ["07:00u Ida Red", "18:00u Jack Orange"],
            7: ["10:30u Kate Violet", "14:30u Leo Indigo"],
            8: ["09:30u Mike Gray", "13:30u Nina Teal"],
            9: [],
            10: ["08:30u Quinn Brown", "16:30u Rob Black"],
            11: ["12:30u Sam Green", "17:30u Tom Blue"],
            12: ["07:30u Uma Red", "18:30u Vic Orange"],
            13: ["10:45u Walt Violet", "14:45u Xena Indigo"],
            14: ["09:45u Yan Gray", "13:45u Zoe Teal"],
            15: ["11:45u Amy Gold", "15:45u Ben Silver"],
            16: [],
            17: ["12:45u Ed Green", "17:45u Fay Blue"],
            18: ["07:45u Gus Red", "18:45u Hal Orange"],
            19: ["10:15u Ian Violet", "14:15u Jen Indigo"],
            20: ["09:15u Kim Gray", "13:15u Lou Teal"],
            21: ["11:15u Max Gold", "15:15u Ned Silver"],
            22: ["08:15u Oli Brown", "16:15u Pat Black"],
            23: [],
            24: ["07:15u Tim Red", "18:15u Uma Orange"],
            25: ["10:55u Val Violet", "14:55u Wes Indigo"],
            26: ["09:55u Xim Gray", "13:55u Yul Teal"],
            27: ["11:55u Zed Gold", "15:55u Amy Silver"],
            28: ["08:55u Ben Brown", "16:55u Carl Black"],
            29: ["12:55u Dan Green", "17:55u Ed Blue"],
            30: []
        };

        if (showWeekCalendar) {
            // Render only the tiles from the 3rd of June to the 9th of June
            const weekDays = [3, 4, 5, 6, 7, 8, 9];
            for (let day of weekDays) {
                items.push(
                    <div key={day} className="grid-item">
                        <div className="day-number">{day}</div>
                        <div className="greybutton-container">
                            {appointments[day] && appointments[day].map((appointment, idx) => (
                                <button key={idx} className="grey-button" onClick={() => handleAppointmentClick(day, appointment)}>{appointment}</button>
                            ))}
                        </div>
                    </div>
                );
            }
        } else {
            // Render all rows for the entire month of June
            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 7; col++) {
                    const index = row * 7 + col;
                    if (index >= startingDayIndex && dayNumber <= 30) {
                        // Check if the current day is not Sunday
                        const isNotSunday = (index + 1) % 7 !== 0;

                        items.push(
                            <div key={index} className="grid-item">
                                <div className="day-number">{dayNumber}</div>
                                {/* Conditionally render buttons if the day is not Sunday */}
                                {isNotSunday && (
                                    <div className="greybutton-container">
                                        {appointments[dayNumber] && appointments[dayNumber].map((appointment, idx) => (
                                            <button key={idx} className="grey-button" onClick={() => handleAppointmentClick(dayNumber, appointment)}>{appointment}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                        dayNumber++;
                    } else {
                        // Otherwise, display an empty grid item
                        items.push(<div key={index} className="empty-grid-item"></div>);
                    }
                }
            }
        }

        return items;
    };

    const handleAppointmentClick = (day, appointment) => {
        const [time, patient] = appointment.split('u ');
        const startTime = time.trim();
        const endTime = calculateEndTime(startTime);
        setSelectedAppointment({
            day,
            startTime,
            endTime,
            patient,
            staff: 'Dr. Koenen'
        });
    };

    const calculateEndTime = (startTime) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(hours, minutes);
        const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
        const endHours = endDate.getHours().toString().padStart(2, '0');
        const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
        return `${endHours}:${endMinutes}`;
    };

    const renderDaysOfWeek = () => {
        const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
        return days.map((day, index) => (
            <div key={index} className="day">
                {day}
            </div>
        ));
    };
>>>>>>> Stashed changes

    return (
        <>
            <Navbar />
<<<<<<< Updated upstream
            <TopPage headerName="Kalender" />
            <div className="content">
                <DataTable />
            </div>
            {/* Rounded square */}
            <div className="rounded-square"></div>
=======
            <div className="calendar-grid-container">
                <div className="button-container">
                    <button className="header-button" onClick={handleMonthButtonClick}>Maand</button>
                    <button className="header-button" onClick={handleWeekButtonClick}>Week</button>
                    <button className="header-button" onClick={handleDayButtonClick}>Dag</button>
                    <div className="header-dropdown">
                        <button className="header-button" onClick={handleDropdownToggle}>Selecteer type</button>
                        <button className="header-button" onClick={handleNewAppointmentButtonClick}>Nieuwe Afspraak</button>
                        {dropdownOpen && (
                            <div className="dropdown-content">
                                <button onClick={() => handleOptionChange('Radiologie')} className="header-button">Radiologie</button>
                                <button onClick={() => handleOptionChange('Myometrie')} className="header-button">Myometrie</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="days-of-week">
                    {renderDaysOfWeek()}
                </div>
                <div className="calendar-grid">
                    {renderGridItems()}
                </div>
            </div>
            <div className="rounded-square">
                {selectedAppointment && (
                    <div className="appointment-details">
                        <p>Naam patiënt: {selectedAppointment.patient}</p>
                        <p>Tijd afspraak: {selectedAppointment.startTime}u tot {selectedAppointment.endTime}u</p>
                        <p>Medewerker: {selectedAppointment.staff}</p>
                    </div>
                )}
            </div>
            {showNewAppointment && (
                <div className="appointment-section">
                    {/* Content for the new appointment section */}
                    New Appointment Section
                </div>
            )}
>>>>>>> Stashed changes
        </>
    );
}

export default Kalender;
