import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import TopPage from '../components/TopPage';
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

  const DataRow = ({ Type, Date, Id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (Type === 'Myometrie') {
        navigate(`/myometriepage/${patientId}/${Id}`);
      } else if (Type === 'Radiologie') {
        navigate(`/radiologypage/${patientId}/${Id}`);
      } else {
        window.alert(`Row clicked: ${Type}`);
      }
    };

    const handlePdfClick = (e) => {
      e.stopPropagation(); // Prevent triggering the row click event
      // Handle PDF icon click logic here
      window.alert('PDF icon clicked');
    };

    // Format the date to display only the date part
    const formattedDate = new window.Date(Date).toLocaleDateString('en-GB');

    return (
      <div className="data-row-container">
        <table className='table_2'>
          <tbody>
            <tr onClick={handleClick}>
              <td className="text-cell"><div className="rounded-left">{Type}</div></td>
              <td className="text-cell"><div className="rounded-right">{formattedDate}</div></td>
            </tr>
          </tbody>
        </table>
        <i className="bi bi-filetype-pdf ResultIcon" onClick={handlePdfClick}></i>
      </div>
    );
  };

  const DataTable = ({ data }) => (
    <>
      <table className='table_2'>
        <thead>
          <tr>
            <th className="th-header-left-result"><div className="header-rounded-left-result header-item">Type</div></th>
            <th className="th-header-right-result"><div className="header-rounded-right-result header-item">Date</div></th>
            <th className="header-empty"></th>
          </tr>
        </thead>
      </table>

      <div className="scrollable-table">
        {data.map((row, index) => <DataRow key={index} {...row} />)}
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <TopPage headerName="Patient" patientId={patientId} imageSrc={imageSrc} />
      <div className="content">
        <DataTable data={data} />
      </div>
    </>
  );
}

export default ResultOverview;
