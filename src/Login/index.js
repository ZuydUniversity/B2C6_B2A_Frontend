import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './routes/login.jsx';
import Home from './routes/home.jsx';
import LoginDaan from './routes/logindaan.jsx';
import Register from './Routes/register.jsx';
import ForgotPassword from './routes/forgotpassword.jsx'
 
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/logindaan", element: <LoginDaan /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot", element: <ForgotPassword /> }
 
]);
 
ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
        <RouterProvider router={router} />
   </React.StrictMode>,
)