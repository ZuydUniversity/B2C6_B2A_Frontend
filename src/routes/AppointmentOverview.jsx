import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

const AppointmentOverview = () => {
  const navigate = useNavigate();
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

  const handleView = (id) => {
    navigate(`/appointmentview/view/${id}`);
  };

  const handleCreate = () => {
    navigate('/appointmentview/create');
  };

  const handleEdit = (id) => {
    navigate(`/appointmentview/edit/${id}`);
  };

  const handleDelete = (id) => {
    const deleteAppointment = async () => {
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
      <div className="container formwidth">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Beschrijving</th>
              <th scope="col">Datum & tijd</th>
              <th scope="col">
                <button className="btn btn-outline-primary" onClick={handleCreate}>Nieuwe afspraak</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id) => (
              <tr key={id}>
                <td onClick={() => handleView(id)}>{data[id].Description}</td>
                <td onClick={() => handleView(id)}>
                  {new Date(data[id].Date).toLocaleString('nl-NL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZone: 'UTC'
                  })}
                </td>
                <td>
                  <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(id)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleDelete(id)}>
                    <i className="bi bi-trash3-fill"></i>
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