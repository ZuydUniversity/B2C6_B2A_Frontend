import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/Main.css';
import '../styling/Kalender.css';
import Navbar from '../components/Navbar';


function Kalender() {
    const [showWeekCalendar, setShowWeekCalendar] = useState(false);
    const [showDayCalendar, setShowDayCalendar] = useState(false);
    const [showNewAppointment, setShowNewAppointment] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [currentWeekStartIndex, setCurrentWeekStartIndex] = useState(3);
    const [currentDayIndex, setCurrentDayIndex] = useState(5);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/user/10/appointment/get', {
                    params: {
                        start_date: "2024-06-01",
                        end_date: "2024-06-30"
                    }
                });
    
                setAppointments(response.data.appointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
    
        fetchAppointments();
    }, []);


    const handleWeekButtonClick = () => {
        setShowWeekCalendar(true);
        setShowDayCalendar(false);
        setShowNewAppointment(false);
    };

    const handleMonthButtonClick = () => {
        setShowWeekCalendar(false);
        setShowDayCalendar(false);
        setShowNewAppointment(false);
    };

    const handleDayButtonClick = () => {
        console.log('Dag button clicked');
        setShowWeekCalendar(false);
        setShowDayCalendar(true);
        setShowNewAppointment(false);
    };

    const handleVorigeDagButtonClick = () => {
        setShowWeekCalendar(false);
        setShowDayCalendar(true);
        setShowNewAppointment(false);
        setCurrentDayIndex(prevIndex => (prevIndex > 1 ? prevIndex - 1 : 1)); 
    };

    const handleVolgendeDagButtonClick = () => {
        setShowWeekCalendar(false);
        setShowDayCalendar(true);
        setShowNewAppointment(false);
        setCurrentDayIndex(prevIndex => (prevIndex < 30 ? prevIndex + 1 : 30)); 
    };
    
    const handleVolgendeWeekButtonClick = () => {
        setShowWeekCalendar(true);
        setShowDayCalendar(false);
        setShowNewAppointment(false);
    
        if (currentWeekStartIndex + 7 <= 30) {
            setCurrentWeekStartIndex(currentWeekStartIndex + 7);
        } else {
            setCurrentWeekStartIndex(30 - 6);
        }
    };
    
    const handleVorigeWeekButtonClick = () => {
        setShowWeekCalendar(true);
        setShowDayCalendar(false);
        setShowNewAppointment(false);
    
        if (currentWeekStartIndex - 7 >= 3) {  
            setCurrentWeekStartIndex(currentWeekStartIndex - 7);
        } else {
            setCurrentWeekStartIndex(-4);  
        }
    };
    


    const handleNewAppointmentButtonClick = () => {
        setShowNewAppointment(true);
    };

    const handleDaySwitch = (dayIndex) => {
        setCurrentDayIndex(dayIndex);
        setShowDayCalendar(true);
        setShowWeekCalendar(false);
        setShowNewAppointment(false);
    };
    

    const renderGridItems = () => {
    const startingDayIndex = 5;
    const items = [];
    let dayNumber = 1;

    if (showWeekCalendar) {
        const weekDays = Array.from({ length: 7 }, (_, i) => currentWeekStartIndex + i);
        for (let day of weekDays) {
            items.push(
                <div key={day} className="grid-item week-view-item">
                    <div className="day-number">{day}</div>
                    <button className="small-button" onClick={() => handleDaySwitch(day)}>v</button>
                    <div className="greybutton-container">
                        {appointments && appointments[day.toString()] && appointments[day.toString()].map((appointment, idx) => (
                            <div key={idx} className="appointment-item">
                                <button className="grey-button" onClick={() => handleAppointmentClick(day.toString(), appointment)}>
                                    {appointment.Description}
                                </button>
                                <div className="appointment-details-in-grid">
                                    <p>User ID: {appointment.participants['10'].id}</p>
                                    <p>Date: {appointment.Date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    } else if (showDayCalendar) {
        items.push(
            <div key={currentDayIndex} className="grid-item day-view-item">
                <div className="day-number">{currentDayIndex}</div>
                <button className="small-button" onClick={() => handleDaySwitch(currentDayIndex)}>v</button>
                <div className="greybutton-container">
                    {appointments && appointments[currentDayIndex.toString()] && appointments[currentDayIndex.toString()].map((appointment, idx) => (
                        <div key={idx} className="appointment-item">
                            <button className="grey-button" onClick={() => handleAppointmentClick(currentDayIndex.toString(), appointment)}>
                                {appointment.Description}
                            </button>
                            <div className="appointment-details-in-grid">
                                <p>User ID: {appointment.participants['10'].id}</p>
                                <p>Date: {appointment.Date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const index = row * 7 + col;
                if (index >= startingDayIndex && dayNumber <= 30) {
                    items.push(
                        <div key={index} className="grid-item">
                            <div className="day-number">{dayNumber}</div>
                            <button className="small-button" onClick={() => handleDaySwitch(dayNumber)}>v</button>
                            <div className="greybutton-container">
                                {appointments && appointments[dayNumber.toString()] && appointments[dayNumber.toString()].map((appointment, idx) => (
                                    <div key={idx} className="appointment-item">
                                        <button className="grey-button" onClick={() => handleAppointmentClick(dayNumber.toString(), appointment)}>
                                            {appointment.Description}
                                        </button>
                                        <div className="appointment-details-in-grid">
                                            <p>User ID: {appointment.participants['10'].id}</p>
                                            <p>Date: {appointment.Date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                    dayNumber++;
                } else {
                    items.push(<div key={index} className="empty-grid-item"></div>);
                }
            }
        }
    }

    return items;
};


    const handleAppointmentClick = (day, appointment) => {
        const startTime = appointment.Date.split(' ')[1];
        const endTime = calculateEndTime(startTime);
        const cleanedPatient = `${appointment.participants[10].name} ${appointment.participants[10].lastname}`;
        const userId = appointment.participants[10].id; 
    
        setSelectedAppointment({
            day,
            startTime,
            endTime,
            patient: cleanedPatient,
            staff: userId,
            type: appointment.Description,
            userId,  
            date: appointment.Date,  
        });
    };
    


    const calculateEndTime = (startTime) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(hours, minutes);
        const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); 
        const endHours = endDate.getHours().toString().padStart(2, '0');
        const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
        return `${endHours}:${endMinutes}`;
    };

    const renderDaysOfWeek = () => {
        const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
        if (showDayCalendar) {
            return <div className="day">{days[(currentDayIndex - 3) % 7]}</div>;
        }
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
            <div className="container formwidth">
                <div className="row">
                    <div className="col">
                        <div className="btn-group mb-3">
                            <button className="btn btn-outline-primary" onClick={handleMonthButtonClick}>Maand</button>
                            <button className="btn btn-outline-primary" onClick={handleWeekButtonClick}>Week</button>
                            <button className="btn btn-outline-primary" onClick={handleDayButtonClick}>Dag</button>
                            <button className="btn btn-outline-primary" onClick={handleMonthButtonClick}>Vorige Maand</button>
                            <button className="btn btn-outline-primary" onClick={handleMonthButtonClick}>Volgende Maand</button>
                            <button className="btn btn-outline-primary" onClick={handleVorigeWeekButtonClick}>Vorige Week</button>
                            <button className="btn btn-outline-primary" onClick={handleVolgendeWeekButtonClick}>Volgende Week</button>
                            <button className="btn btn-outline-primary" onClick={handleVorigeDagButtonClick}>Vorige Dag</button>
                            <button className="btn btn-outline-primary" onClick={handleVolgendeDagButtonClick}>Volgende Dag</button>
                            <button className="btn btn-outline-primary" onClick={handleNewAppointmentButtonClick}>Nieuwe Afspraak</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <div className="month-year-container">
                            {renderMonth()}
                            {renderYear()}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col days-of-week">
                        {renderDaysOfWeek()}
                    </div>
                </div>
                <div className="row calendar-grid">
                    {renderGridItems()}
                </div>
            {selectedAppointment && (
                <div className="container mt-4">
                    <div className="row">
                        <div className="col">
                            <div className="rounded-square">
                                <div className="appointment-details">
                                    <p><strong>Afspraak details</strong></p>
                                    <p><strong>Datum:</strong> {selectedAppointment.day} juni 2024</p>
                                    <p><strong>Begintijd:</strong> {selectedAppointment.startTime}</p>
                                    <p><strong>Eindtijd:</strong> {selectedAppointment.endTime}</p>
                                    <p><strong>Patiënt:</strong> {selectedAppointment.patient}</p>
                                    <p><strong>Medewerker:</strong> {selectedAppointment.staff}</p>
                                    <p><strong>Type:</strong> {selectedAppointment.type}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Kalender;