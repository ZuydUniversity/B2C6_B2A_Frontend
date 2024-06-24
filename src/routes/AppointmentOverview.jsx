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
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await api.get('/appointment/get_all');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching the data', error);
    }
  }

  const handleCreate = () => {
    console.log('Create new appointment');
  };

  const handleEdit = (id) => {
    console.log(`Edit appointment with id: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    const deleteAppointment = async () => {
      console.log(`Delete appointment with id: ${id}`)
      try {
        await api.delete(`/appointment/${id}/delete`);
        fetchData();
      } catch (error) {
        console.error('Error deleting the appointment', error);
      }
    };

    deleteAppointment();
  };

  return (
    <>
      <Navbar />
      <div>
        <table className='appointment_table'>
          <caption>Afsprakenlijst</caption>
          <thead>
            <tr>
              <th>Beschrijving</th>
              <th>Datum & tijd</th>
              <th>
                <button onClick={() => handleCreate()}>Nieuwe afspraak</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([id, appointment]) => (
              <tr key={id}>
                <td>{appointment.Description}</td>
                <td>{new Date(appointment.Date).toLocaleString('nl-NL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
                <td>
                  <button onClick={() => handleEdit(id)}>
                    <i className="bi bi-pencil-square custom-icon"></i>
                  </button>
                  <button onClick={() => handleDelete(id)}>
                    <i className="bi bi-trash3-fill custom-icon"></i>
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
