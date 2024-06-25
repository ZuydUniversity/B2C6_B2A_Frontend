import React, {  useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResMenu() {

    const location = useLocation();
    const navigate = useNavigate();
    const message = "";
    const { email, role } = location.state || {};

    useEffect(() => {
        
        if (!email || role != 4) {
            navigate('/');
            return;
        }

        const checkSession = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/checksession', {
                    method: 'POST',
                    body: email,
                    credentials: 'include',
                });

                if(!response.ok) {
                    navigate('/')
                }
            }
            catch (error) {
                console.error('Error:', error);
                navigate('/')

            }
        };

        checkSession();
    }, []);
    
    

  return (
    <>
        <h1>ResMenu</h1>
        <h1>{email} session valid</h1>
    </>  
  );

}

export default ResMenu;