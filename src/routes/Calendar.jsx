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
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [displayDate, setDisplayDate] = useState(new Date());
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());
    const [currentDayIndex, setCurrentDayIndex] = useState(currentDate.getDate());
    const [appointments, setAppointments] = useState([]);
    const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];

    useEffect(() => {
        const fetchAppointments = async (startDate, endDate) => {
            try {
                const response = await api.get('/user/10/appointment/get', {
                    params: {
                        start_date: startDate,
                        end_date: endDate
                    }
                });
                const parsedAppointments = parseAppointments(response.data);
                setAppointments(parsedAppointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        const startOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1);
        const endOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0);

        fetchAppointments(
            startOfMonth.toISOString().split('T')[0],
            endOfMonth.toISOString().split('T')[0]
        );
    }, [displayDate]);

    useEffect(() => {
        if (showWeekCalendar) {
            const startOfWeek = new Date(displayDate);
            startOfWeek.setDate(displayDate.getDate() - displayDate.getDay() + 1);
            setCurrentWeekStartDate(startOfWeek);
        }
    }, [displayDate, showWeekCalendar]);

    const handleNewAppointmentButtonClick = () => {
        // Use history to navigate to the new appointment page
        // In order to return to this page
        // history.push('/appointment/create');
    };

    const handleWeekButtonClick = () => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        setDisplayDate(startOfWeek);
        setShowWeekCalendar(true);
        setShowDayCalendar(false);
    };

    const handleMonthButtonClick = () => {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        setDisplayDate(firstDayOfMonth);
        setShowWeekCalendar(false);
        setShowDayCalendar(false);
    };

    const handleDayButtonClick = () => {
        setDisplayDate(currentDate);
        setShowWeekCalendar(false);
        setShowDayCalendar(true);
        setCurrentDayIndex(currentDate.getDate());
    };

    const handleCalendarSwitch = (direction) => {
        const newDate = new Date(displayDate);

        if (showWeekCalendar) {
            newDate.setDate(displayDate.getDate() + (direction === 'next' ? 7 : -7));
        } else if (showDayCalendar) {
            newDate.setDate(displayDate.getDate() + (direction === 'next' ? 1 : -1));
            setCurrentDayIndex(newDate.getDate());
        } else {
            newDate.setMonth(displayDate.getMonth() + (direction === 'next' ? 1 : -1));
        }

        setDisplayDate(newDate);
    };

    const handleDaySwitch = (dayIndex) => {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), dayIndex);
        setDisplayDate(newDate);
        setShowDayCalendar(true);
        setShowWeekCalendar(false);
        setCurrentDayIndex(dayIndex);
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

    const getStartingDayIndexForMonth = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        return (firstDay.getDay() + 6) % 7; // Adjusting to start the week on Monday
    };

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const renderGridItems = () => {
        const startingDayIndex = getStartingDayIndexForMonth(displayDate);
        const daysInMonth = getDaysInMonth(displayDate);
        const items = [];
        let dayNumber = 1;

        if (showWeekCalendar) {
            const weekDays = Array.from({ length: 7 }, (_, i) => new Date(currentWeekStartDate).getDate() + i);
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
                    if (index >= startingDayIndex && dayNumber <= daysInMonth) {
                        const appointmentsForDay = appointments[dayNumber] || [];
                        items.push(
                            <div key={index} className="grid-item">
                                <div className="day-number">{dayNumber}</div>
                                <button className="small-button" onClick={() => handleDaySwitch(dayNumber)}>v</button>
                                {appointmentsForDay.map((appointment) => (
                                    <div key={appointment.id} className="greybutton-container">
                                        <div className="appointment-item">
                                            <button className="grey-button" onClick={() => handleAppointmentClick(dayNumber, appointment)}>
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
                            <button className="btn btn-outline-primary" onClick={handleMonthButtonClick}>Maand</button>
                            <button className="btn btn-outline-primary" onClick={handleWeekButtonClick}>Week</button>
                            <button className="btn btn-outline-primary" onClick={handleDayButtonClick}>Dag</button>
                            <button className="btn btn-outline-primary" onClick={() => handleCalendarSwitch('prev')}>Vorige</button>
                            <button className="btn btn-outline-primary" onClick={() => handleCalendarSwitch('next')}>Volgende</button>
                            <button className="btn btn-outline-primary" onClick={handleNewAppointmentButtonClick}>Nieuwe Afspraak</button>
                        </div>
                    </div>
                </div>

                <div className="month-year-container row">
                    <div className="col-auto">
                        <div className="month-year-display">
                            {displayDate.toLocaleString('nl-NL', { month: 'long', localeMatcher: 'best fit' })} {displayDate.getFullYear()}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col days-of-week">
                        {showDayCalendar ? (
                            <div className="day">{days[(new Date(displayDate)).getDay() - 1]}</div>
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
            </div>
        </>
    );
}

export default Calendar;
