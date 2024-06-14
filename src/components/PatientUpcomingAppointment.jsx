//Dit was een eerste poging tot het vullen van de patienten hun afspraken vanuit de database, maar dit is niet gelukt.
//Zodat ik het niet perongeluk gebruik tot het gemaakt is heb ik alles gecomment.

// import React, { useEffect, useState } from 'react';

// const PatientUpcomingAppointment = ({ patientId }) => {
//     const [appointments, setAppointments] = useState([]);

//     useEffect(() => {
//         const fetchAppointments = async () => {
//             try {
//                 const response = await fetch(`/patients/${patientId}/appointments`);
//                 const data = await response.json();
//                 setAppointments(data);
//             } catch (error) {
//                 console.error('Error fetching appointments:', error);
//             }
//         };

//         fetchAppointments();
//     }, [patientId]);

//     return (
//         <div>
//             <h2>Upcoming Appointments</h2>
//             {appointments.length === 0 ? (
//                 <p>No upcoming appointments found for this patient.</p>
//             ) : (
//                 <ul>
//                     {appointments.map((appointment) => (
//                         <li key={appointment.id}>
//                             <p>Date: {appointment.date}</p>
//                             <p>Time: {appointment.time}</p>
//                             <p>Doctor: {appointment.doctor}</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default PatientUpcomingAppointment;

