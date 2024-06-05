import React from 'react';
import '../App.css';

const AppointmentOverview = () => {
  const data = [
    { id: 1, patientName: 'John Smith', doctorName: 'Dr. Alice Jansen', date: new Date('2024-06-10T09:00:00'), description: 'Jaarlijkse medische controle' },
    { id: 2, patientName: 'Jane Doe', doctorName: 'Dr. Bob de Bruin', date: new Date('2024-06-11T14:30:00'), description: 'Vervolgafspraak voor bloedtestresultaten' },
    { id: 3, patientName: 'Emily de Vries', doctorName: 'Dr. Karel de Vries', date: new Date('2024-06-12T11:00:00'), description: 'Consultatie voor kniepijn' },
    { id: 4, patientName: 'Michael de Jong', doctorName: 'Dr. Diana Groen', date: new Date('2024-06-13T16:00:00'), description: 'Routine tandreiniging' },
    { id: 5, patientName: 'Sarah de Wit', doctorName: 'Dr. Evan Martinez', date: new Date('2024-06-14T10:30:00'), description: 'Oogonderzoek' }
  ];

  return (
    <div>
      <table className='appointment_table'>
        <caption>Afsprakenlijst</caption>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Dokter</th>
            <th>Datum & tijd</th>
            <th>Beschrijving</th>
          </tr>
        </thead>
        <tbody>
          {data.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.date.toLocaleString('nl-NL', {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit'
              })}</td>
              <td>{appointment.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentOverview;

