import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/Main.css';
import '../styling/Calendar.css';
import Navbar from '../components/Navbar';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000', // Replace with your base URL
  });

function Calendar() {
    const [showWeekCalendar, setShowWeekCalendar] = useState(false);
    const [showDayCalendar, setShowDayCalendar] = useState(false);
    const [showNewAppointment, setShowNewAppointment] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentWeekStartIndex, setCurrentWeekStartIndex] = useState(3);
    const [currentDayIndex, setCurrentDayIndex] = useState(5);
    const [appointments, setAppointments] = useState([]);
    const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('/user/10/appointment/get', {
                    params: {
                        start_date: "2024-06-01",
                        end_date: "2024-06-30"
                    }
                });
                const parsedAppointments = parseAppointments(response.data);
                setAppointments(parsedAppointments);
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
        setShowWeekCalendar(false);
        setShowDayCalendar(true);
        setShowNewAppointment(false);
        //Current day index is set to index of day clicked if clicked
    };

    const handleCalendarSwitch = (type, direction) => {
        setShowWeekCalendar(type === 'week');
        setShowDayCalendar(type === 'day');
        setShowNewAppointment(false);
    
        if (type === 'day') {
            setCurrentDayIndex(prevIndex => {
                const newIndex = direction === 'next' ? prevIndex + 1 : prevIndex - 1;
                return Math.max(1, Math.min(30, newIndex)); // ensuring the index stays within bounds
            });
        } else if (type === 'week') {
            setCurrentWeekStartIndex(prevIndex => {
                const newIndex = direction === 'next' ? prevIndex + 7 : prevIndex - 7;
                return Math.max(-4, Math.min(30 - 6, newIndex)); // ensuring the index stays within bounds
            });
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

    const handleAppointmentClick = (day, appointment) => {
        const startTime = appointment.Date.split(' ')[1];
        const cleanedPatient = `${appointment.participants[10].name} ${appointment.participants[10].lastname}`;
        const userId = appointment.participants[10].id; 
    
        setSelectedAppointment({
            day,
            startTime,
            patient: cleanedPatient,
            staff: userId,
            type: appointment.Description,
            userId,  
            date: appointment.Date,  
        });
    };

    const parseAppointments = (data) => {
        const parsed = {};
        for (const id in data) {
            const appointment = { id, ...data[id] };
            const date = new Date(appointment.Date);
            const day = date.getDate();
            if (!parsed[day]) {
                parsed[day] = [];
            }
            parsed[day].push(appointment);
        }
        return parsed;
    };

    const renderGridItems = () => {
    const startingDayIndex = 5; // getStartingDayIndexForMonth()
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
                    const appointmentsForDay = appointments[dayNumber] || [];
                    items.push(
                        <div key={index} className="grid-item">
                            <div className="day-number">{dayNumber}</div>
                            <button className="small-button" onClick={() => handleDaySwitch(dayNumber)}>v</button>
                            {appointmentsForDay.map((appointment) => (
                                <div key={appointment.id} className="greybutton-container">
                                    <div className="appointment-item">
                                        <button className="grey-button" onClick={() => handleAppointmentClick(appointment)}>
                                            {appointment.Description}
                                        </button>
                                    </div>
                                </div>
                            ))}
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

    return (
        <>
            <Navbar />
            <div className="container formwidth">
                <div className="row">
                    <div className="col">
                        <div className="btn-group mb-3">
                            <button className="btn btn-outline-primary" onClick={() => handleMonthButtonClick}>Maand</button>
                            <button className="btn btn-outline-primary" onClick={() => handleWeekButtonClick}>Week</button>
                            <button className="btn btn-outline-primary" onClick={() => handleDayButtonClick}>Dag</button>
                            <button className="btn btn-outline-primary" onClick={() => handleMonthButtonClick}>Vorige Maand</button>
                            <button className="btn btn-outline-primary" onClick={() => handleMonthButtonClick}>Volgende Maand</button>
                            <button className="btn btn-outline-primary" onClick={() => handleCalendarSwitch('week', 'prev')}>Vorige Week</button>
                            <button className="btn btn-outline-primary" onClick={() => handleCalendarSwitch('week', 'next')}>Volgende Week</button>
                            <button className="btn btn-outline-primary" onClick={() => handleCalendarSwitch('day', 'prev')}>Vorige Dag</button>
                            <button className="btn btn-outline-primary" onClick={() => handleCalendarSwitch('day', 'next')}>Volgende Dag</button>
                            <button className="btn btn-outline-primary" onClick={() => handleNewAppointmentButtonClick}>Nieuwe Afspraak</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="month-year-container row">
                    <div className="col-auto">
                        <div className="month-year-display">
                            {currentDate.toLocaleString('nl-NL', { month: 'long', localeMatcher: 'best fit' })} {currentDate.getFullYear()}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col days-of-week">
                        {showDayCalendar ? (
                            <div className="day">{days[(currentDayIndex - 3 + 7) % 7]}</div>
                        ) : (
                            days.map((day, index) => (
                                <div key={index} className="day">
                                    {day}
                                </div>
                            ))
                        )}
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

export default Calendar;