import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import TopPage from '../components/TopPage';
import axios from 'axios';

function ResultOverview() {
  const { patientId } = useParams();
  const imageSrc = '../src/assets/kid_1.png';
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

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

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const DataRow = ({ Type, Date, Id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (Type === 'Myometrie') {
        navigate(`/myometriepage/${patientId}/${Id}`);
      } else if (Type === 'Radiologie') {
        navigate(`/radiologypage/${patientId}/`);
      } else {
        window.alert(`Row clicked: ${Type}`);
      }
    };

    const handlePdfClick = async (e) => {
      e.stopPropagation(); // Prevent triggering the row click event
      try {
        const response = await axios.get(`http://localhost:5000/download_result_pdf/${patientId}/${Id}`, {
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `result_${Id}_data.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    };

    const formattedDate = new window.Date(Date).toLocaleDateString('en-GB');

    return (
      <tr onClick={handleClick} style={{ cursor: 'pointer' }}>
        <td>{Type}</td>
        <td>{formattedDate}</td>
        <td>
          <i className="bi bi-filetype-pdf" onClick={handlePdfClick}></i>
        </td>
      </tr>
    );
  };

  const DataTable = ({ data }) => (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th onClick={() => requestSort('Type')}>Type</th>
            <th onClick={() => requestSort('Date')}>Date</th>
            <th>Download</th>
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
      <TopPage headerName="Patient" patientId={patientId} imageSrc={imageSrc} />
      <div className="container mt-4">
        <DataTable data={sortedData} />
      </div>
    </>
  );
}

export default ResultOverview;
