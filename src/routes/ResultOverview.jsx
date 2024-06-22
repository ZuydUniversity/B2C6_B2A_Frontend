import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import TopPage from '../components/TopPage';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ResultOverview() {
  const { patientId } = useParams();
  const imageSrc = '../src/assets/kid_1.png';
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (patientId) => {
      try {
        const response = await axios.get(`http://localhost:5000/patients/${patientId}/get_results`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(patientId);
  }, [patientId]);

  const DataRow = ({ Type, Date }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (Type === 'Myometrie') {
        navigate(`/myometriepage/${patientId}`);
      } else if (Type === 'Radiologie') {
        navigate(`/radiologypage/${patientId}`);
      } else {
        window.alert(`Row clicked: ${Type}`);
      }
    };

    // Format the date to display only the date part
    const formattedDate = new window.Date(Date).toLocaleDateString('en-GB');

    return (
      <tr onClick={handleClick} style={{ cursor: 'pointer' }}>
        <td>{Type}</td>
        <td>{formattedDate}</td>
      </tr>
    );
  };

  const DataTable = ({ data }) => (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => <DataRow key={index} {...row} />)}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <TopPage headerName="Patiënt" patientId={patientId} imageSrc={imageSrc} />
        <div className="mt-4">
          <DataTable data={data} />
        </div>
      </div>
    </>
  );
}

export default ResultOverview;
