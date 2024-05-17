import React, { useEffect, useState } from 'react';

function DataGridFiller() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/data')
            .then(response => response.json())
            .then(data => {
                setData(data);
            });
    }, []);

    if (data.length === 0) {
        return 'Loading...';
    }

    return (
        <div>
            <h1>All data retrieved with Flask:</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataGridFiller;
