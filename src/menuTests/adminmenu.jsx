import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';




function DocMenu() {
    const navigate = useNavigate();
    const [user_id, setUser_id] = useState(null);

    useEffect(() => {
        async function GetAccountInfo(){
            try {
                const authToken = Cookies.get('auth_token');
                if (!authToken) {
                    throw new Error('Not authenticated');
                }
                const response = await fetch('http://127.0.0.1:5000/get_account_info', {
                    method: 'POST',  // Changed to POST method
                    headers: {
                        'Content-Type': 'application/json',
                        credentials: "include"
                    },
                    body: JSON.stringify({ auth_token: authToken })
                });
    
                if (!response.ok) {
                    if(response.status === 500) {
                        throw new Error('Server error, probeer het later opnieuw');
                    }
                    throw new Error('Error met het authenticeren, probeer het later opniew');
                }
    
                if (response.ok) {
                   let data = await response.json();
                   let role = data.role;
                   setUser_id(data.user_id);
                   if(role != 3) {
                       throw new Error('Geen toegang tot deze pagina');
                   }
                }
            } catch (error) {
                console.error('Auth error:', error);
                navigate('/');
            }
        }
        GetAccountInfo();
    }, []);

    

    return (
        <>
            <h1>Beh</h1>
            <h1> userid : {user_id} </h1>
        </>
    );
}

export default DocMenu;