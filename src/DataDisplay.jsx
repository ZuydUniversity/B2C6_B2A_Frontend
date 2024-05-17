import React, { useEffect, useState } from 'react';

function DataDisplay() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/Hello_World')
            .then(response => response.text()) // Changed from response.json() to response.text()
            .then(data => {
                console.log('Response from server:', data); // Log the response from the server
                setData(data);
            });
    }, []);

    console.log('Current state:', data); // Log the current state

    if (data === null) {
        return 'Loading...';
    }

    return (
        <div>
            <h1>Hello world from Flask:</h1>
            <pre>{data}</pre>
        </div>
    );
}

export default DataDisplay;