import Navbar from '../components/Navbar';

function PatientOverview() {
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
        <>
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
            </table>


            <div className="scrollable-table">
                <table>
                    <tbody>
                        {data.map((row, index) => <DataRow key={index} {...row} />)}
                    </tbody>
                </table>
            </div>
        </>
    );

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
        { imageSrc: 'src/assets/kid_3.png', name: 'Sabine Edo', birthdate: '08/05/2016', diagnosis: 'Flu' }
    ];

        
    return (
        <>
            <Navbar/>
            <h1>Patientenoverzicht</h1>
            <DataTable data={data} />
        </>
    );
}

export default PatientOverview;