import React, { useState, useEffect } from 'react';
import '../App.css'; // Import the CSS file
import Navbar from '../components/Navbar'; // Double period to go back one directory
import { useNavigate } from 'react-router-dom';
import TopPage from '../components/TopPage';

function ResultOverview() {
  const { patientId } = useParams();
  const imageSrc = '../src/assets/kid_1.png';
  const patientName = 'John Doe';

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/patients/${patientId}/get_results`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [patientId]);

  const DataRow = ({ Type, Date }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (Type === 'Myometrie') {
        navigate('/myometriepage');
      } else if (Type === 'Radiologie') {
        navigate('/radiologypage');
      } else {
        window.alert(`Row clicked: ${Type}`);
      }
    };

    // Format the date to display only the date part
    const formattedDate = new window.Date(Date).toLocaleDateString('en-GB')

    return (
      <tr onClick={handleClick}>
        <td className="text-cell"><div className="rounded-left">{Type}</div></td>
        <td className="text-cell"><div className="rounded-right">{formattedDate}</div></td>
      </tr>
    );
  };

  const DataTable = ({ data }) => (
    <>
      <table className='table_2'>
        <thead>
          <tr>
            <th className="th-header-left"><div className="header-rounded-left header-item">Type</div></th>
            <th className="th-header-right"><div className="header-rounded-right header-item">Date</div></th>
          </tr>
        </thead>
      </table>

      <div className="scrollable-table">
        <table className='table_2'>
          <tbody>
            {data.map((row, index) => <DataRow key={index} {...row} />)}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <TopPage headerName="Resultatenoverzicht" patientName={patientName} imageSrc={imageSrc} />
      <div className="content">
        <DataTable data={data} />
      </div>
    </>
  );
}

export default ResultOverview;
