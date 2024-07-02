import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import TopPage from '../components/TopPage';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'Date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (!isNaN(aValue) && !isNaN(bValue)) {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
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

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return <i class="bi bi-sort-down ps-2"></i>;
      } else {
        return <i class="bi bi-sort-up ps-2"></i>;
      }
    }
    return <i class=" bi bi-sort-up ps-2"></i>;
  };

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
            <th onClick={() => requestSort('Type')} style={{ position: 'relative' }}>
              Type{getSortIcon('Type')}
            </th>
            <th onClick={() => requestSort('Date')} style={{ position: 'relative' }}>
              Datum{getSortIcon('Date')}
            </th>
            <th>Download (PDF) </th>
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
