import React, { useState } from 'react';
function DataSender() {
    const [inputValue, setInputValue] = useState('');
    const sendData = () => {
        fetch('http://localhost:5000/post_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: inputValue })
        });
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button onClick={sendData}>Send Data</button>
        </div>
    );
}
export default DataSender;
