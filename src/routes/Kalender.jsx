import React, { useState } from 'react';
import '../styling/Kalender.css';
import Navbar from '../components/Navbar';
import TopPage from '../components/TopPage';

function Kalender() {
    const [showWeekCalendar, setShowWeekCalendar] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showNewAppointment, setShowNewAppointment] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleWeekButtonClick = () => {
        setShowWeekCalendar(true);
        setShowNewAppointment(false); // Hide new appointment on week view
    };

    const handleMonthButtonClick = () => {
        setShowWeekCalendar(false);
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
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionChange = (type) => {
        console.log('Selected type:', type);
    };

    const renderGridItems = () => {
        const startingDayIndex = 5; // Assuming Saturday is the 6th day of the week (0-indexed)
        const items = [];
        let dayNumber = 1;

        const appointments = {
            1: ["10:00u John Doe My", "14:00u Jane Smith Ra"],
            2: [],
            3: ["11:00u Carol White My", "15:00u Dave Black Ra"],
            4: ["08:00u Eve Green My", "16:00u Frank Blue Ra"],
            5: ["12:00u Grace Pink My", "17:00u Hank Yellow Ra"],
            6: ["07:00u Ida Red My", "18:00u Jack Orange Ra"],
            7: ["10:30u Kate Violet My", "14:30u Leo Indigo Ra"],
            8: ["09:30u Mike Gray My", "13:30u Nina Teal Ra"],
            9: [],
            10: ["08:30u Quinn Brown My", "16:30u Rob Black Ra"],
            11: ["12:30u Sam Green My", "17:30u Tom Blue Ra"],
            12: ["07:30u Uma Red My", "18:30u Vic Orange Ra"],
            13: ["10:45u Walt Violet My", "14:45u Xena Indigo Ra"],
            14: ["09:45u Yan Gray My", "13:45u Zoe Teal Ra"],
            15: ["11:45u Amy Gold My", "15:45u Ben Silver Ra"],
            16: [],
            17: ["12:45u Ed Green My", "17:45u Fay Blue Ra"],
            18: ["07:45u Gus Red My", "18:45u Hal Orange Ra"],
            19: ["10:15u Ian Violet My", "14:15u Jen Indigo Ra"],
            20: ["09:15u Kim Gray My", "13:15u Lou Teal Ra"],
            21: ["11:15u Max Gold My", "15:15u Ned Silver Ra"],
            22: ["08:15u Oli Brown My", "16:15u Pat Black Ra"],
            23: [],
            24: ["07:15u Tim Red My", "18:15u Uma Orange Ra"],
            25: ["10:55u Val Violet My", "14:55u Wes Indigo Ra"],
            26: ["09:55u Xim Gray My", "13:55u Yul Teal Ra"],
            27: ["11:55u Zed Gold My", "15:55u Amy Silver Ra"],
            28: ["08:55u Ben Brown My", "16:55u Carl Black Ra"],
            29: ["12:55u Dan Green My", "17:55u Ed Blue Ra"],
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
        const cleanedPatient = patient.trim().replace(/ My$| Ra$/, ''); // Remove ' My' or ' Ra'
        setSelectedAppointment({
            day,
            startTime,
            endTime,
            patient: cleanedPatient,
            staff: 'Dr. Koenen',
            type: patient.endsWith('My') ? 'Myometrie' : patient.endsWith('Ra') ? 'Radiologie' : ''
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

    const renderMonth = () => {
        return <div className="month-display">June</div>;
    };

    const renderYear = () => {
        return <div className="year-display">2024</div>;
    };

    return (
        <>
            <Navbar />
            <div className="calendar-grid-container">
                <div className="button-container">
                    <button className="header-button" onClick={handleMonthButtonClick}>Maand</button>
                    <button className="header-button" onClick={handleWeekButtonClick}>Week</button>
                    <button className="header-button" onClick={handleDayButtonClick}>Dag</button>
                    <div className="header-dropdown">
                        <button className="header-button" onClick={handleNewAppointmentButtonClick}>Nieuwe Afspraak</button>
                    </div>
                    <button className="header-button" onClick={handleDayButtonClick}>Vorige</button>
                    <button className="header-button" onClick={handleDayButtonClick}>Volgende</button>
                </div>
                <div className="month-year-container">
                    {renderMonth()}
                    {renderYear()}
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
                        <p><strong>Afspraak details</strong></p>
                        <p><strong>Datum:</strong> 3 juni 2024</p>
                        <p><strong>Begintijd:</strong> {selectedAppointment.startTime}</p>
                        <p><strong>Eindtijd:</strong> {selectedAppointment.endTime}</p>
                        <p><strong>Patiënt:</strong> {selectedAppointment.patient}</p>
                        <p><strong>Medewerker:</strong> {selectedAppointment.staff}</p>
                        <p><strong>Type:</strong> {selectedAppointment.type}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Kalender;
