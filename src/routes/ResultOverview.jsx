import '../App.css'; // Import the CSS file
import Navbar from '../components/Navbar'; // Double period to go back one directory
import { useNavigate } from 'react-router-dom';

function ResultOverview() {
  const DataRow = ({ type, date }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (type === 'Myometrie') {
        navigate('/myometriepage');
      } else {
        window.alert(`Row clicked: ${type}`);
      }
    };

    return (
      <tr onClick={handleClick}>
        <td className="text-cell"><div className="rounded-left">{type}</div></td>
        <td className="text-cell"><div className="rounded-right">{date}</div></td>
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
  const data = [
    { type: 'Myometrie', date: '19/03/2024' },
    { type: 'Radiologie', date: '01/07/2022' },
    { type: 'Myometrie', date: '27/11/2020' },
    { type: 'Myometrie', date: '09/10/2019' },
  ];


  const data = [
    { type: 'Myometrie', date: '19/03/2024' },
    { type: 'Radiologie', date: '01/07/2022' },
    { type: 'Myometrie', date: '27/11/2020' },
    { type: 'Myometrie', date: '09/10/2019' },
  ];

  return (
    <>
    <>
      <Navbar />
      <h1>Resultatenoverzicht</h1>
      <DataTable data={data} />
    </>
  );
}

export default ResultOverview;
