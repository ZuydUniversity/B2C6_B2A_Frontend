import React, {useEffect, useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

const AppointmentOverview = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/get_appointments');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);
  
  const handleEdit = (id) => {
    console.log(`Edit appointment with id: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    console.log(`Delete appointment with id: ${id}`);
    // Implement delete functionality here
  };

  return (
    <>
      <Navbar />
      <div>
        <table className='appointment_table'>
          <caption>Afsprakenlijst</caption>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Dokter</th>
              <th>Datum & tijd</th>
              <th>Beschrijving</th>
              <th></th>
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
                <td>
                  <button onClick={() => handleEdit(appointment.id)}>
                    <i class="bi bi-pencil-square custom-icon"></i>
                  </button>
                  <button onClick={() => handleDownload(appointment.id)}>
                    <i class="bi bi-download custom-icon"></i>
                  </button>
                  <button onClick={() => handleDelete(appointment.id)}>
                    <i class="bi bi-trash3-fill custom-icon"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AppointmentOverview;

