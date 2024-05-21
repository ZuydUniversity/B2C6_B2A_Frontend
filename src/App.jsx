import './App.css';
import ReactLogo from './assets/react.svg'
import DataDisplay from './DataDisplay';
import DataSender from './DataSender';
import DataGridFiller from './DataGridFiller';

const DataRow = ({ imageSrc, name, birthdate, diagnosis }) => (
    <tr onClick={() => window.alert('Row clicked!')}>
        <td className="image-cell"><img src={imageSrc} alt="Profile" className="grid-image" /></td>
        <td className="spacer"></td>
        <td className="text-cell"><div className="rounded-left">{name}</div></td>
        <td className="text-cell"><div className="middle-text-cell">{birthdate}</div></td>
        <td className="text-cell"><div className="rounded-right">{diagnosis}</div></td>
    </tr>
);



const DataTable = ({ data }) => (
    <div className="scrollable-table">
        <table>
            <thead>
                <tr>
                    <th className="image-header"></th>
                    <th className="spacer"></th>
                    <th className="th-header-left"><div className="header-rounded-left header-item">Name</div></th>
                    <th className="th-header-middle"><div className="header-rounded-middle header-item">Birthdate</div></th>
                    <th className="th-header-right"><div className="header-rounded-right header-item">Diagnosis</div></th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => <DataRow key={index} {...row} />)}
            </tbody>
        </table>
    </div>
);

function App() {
    const data = [
        { imageSrc: 'src/assets/kid_1.png', name: 'John Doe', birthdate: '14/03/2016', diagnosis: 'Flu' },
        { imageSrc: 'src/assets/kid_2.png', name: 'Henry Pot', birthdate: '24/07/2015', diagnosis: 'Flu' },
        { imageSrc: 'src/assets/kid_3.png', name: 'Sabine Edo', birthdate: '08/05/2016', diagnosis: 'Flu' },
        { imageSrc: 'src/assets/kid_1.png', name: 'John Doe', birthdate: '14/03/2016', diagnosis: 'Flu, flue, foee, fluee, fleueeeeeeeeeeeeeeeeeeeeee, FLueee, FLuiee,', },
        { imageSrc: 'src/assets/kid_2.png', name: 'Henry Pot', birthdate: '24/07/2015', diagnosis: 'Flu' },
        { imageSrc: 'src/assets/kid_3.png', name: 'Sabine Edo', birthdate: '08/05/2016', diagnosis: 'Flu' },
        { imageSrc: 'src/assets/kid_1.png', name: 'John Doe', birthdate: '14/03/2016', diagnosis: 'Flu' },
        { imageSrc: 'src/assets/kid_2.png', name: 'Henry Pot', birthdate: '24/07/2015', diagnosis: 'Flu' },
        { imageSrc: 'src/assets/kid_3.png', name: 'Sabine Edo', birthdate: '08/05/2016', diagnosis: 'Flu' },
        { imageSrc: 'src/assets/kid_1.png', name: 'John Doe', birthdate: '14/03/2016', diagnosis: 'Flu' },
        { imageSrc: 'src/assets/kid_2.png', name: 'Henry Pot', birthdate: '24/07/2015', diagnosis: 'Flu' },
        { imageSrc: 'src/assets/kid_3.png', name: 'Sabine Edo', birthdate: '08/05/2016', diagnosis: 'Flu' },

        // more data...
    ];
  return (
      //<>
      //    <nav>
      //        <ul>
      //            <div className="navitems">
      //                <img src={ReactLogo} alt="React Logo" className="nav-logo" />
      //                <h1 className="homeheader">Welcome to My First React App</h1>
      //            </div>
      //            <div className="navitems">
      //                <li><a href="/">Home</a></li>
      //                <li><a href="/about">About</a></li>
      //                <li><a href="/contact">Contact</a></li>
      //            </div>
      //            {/* Add more <li> elements as needed */}
      //        </ul>
      //    </nav>
      //    <div className="app">
      //        <div className="data-display">
      //            <DataDisplay />
      //        </div>
      //        <div className="data-sender">
      //            <DataSender />
      //        </div>
      //        <div className="data-grid-filler">
      //            <DataGridFiller />
      //        </div>
      //    </div>
      //</>


      <>
          <h1>Patientenoverzicht</h1>
          <DataTable data={data} />
      </>
  );
}

export default App;