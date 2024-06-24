import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';




function BehMenu() {
    const navigate = useNavigate();
    const [user_id, setUser_id] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const allCookies = Cookies.get();
        if (Object.keys(allCookies).length === 0) {
            console.log("No cookies found");
            navigate('/');
        } else {
            setUser_id(Cookies.get('user_id'));
            setRole(Cookies.get('role'));
        }
    }, []);

    useEffect(() => {
        if (user_id === null || role === null) {
            return;
        }
        if (user_id == null || role !== "3") { 
            console.log('Redirecting due to invalid userid or role');
            navigate('/');
        }
    }, [user_id, role]); 

    return (
        <>
            <h1>BehMenu</h1>
            <h1> userid : {user_id} </h1>
        </>
    );
}

export default BehMenu;