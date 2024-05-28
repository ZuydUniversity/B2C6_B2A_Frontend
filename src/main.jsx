import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Register from './Login/Routes/register.jsx';
import ForgotPassword from './Login/Routes/forgotpassword.jsx';
import './Login/App.css';

import PatientOverview from './routes/PatientOverview.jsx';
import ResultOverview from './routes/ResultOverview.jsx';
import PatientView from './routes/PatientView.jsx';


const router = createBrowserRouter([
    { path: "/", element: <App/> },
    { path: "/patientoverview", element: <PatientOverview /> },
    { path: "/patientview", element: <PatientView /> },
    { path: "/resultoverview", element: <ResultOverview /> },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
        <RouterProvider router={router} />
   </React.StrictMode>,
)

//import React from 'react';
//import ReactDOM from 'react-dom/client';
//import ResultOverview from './ResultOverview.jsx'; // Import the new component
//import './index.css';

//ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
//    <ResultOverview /> {/* Render the new component */}
//  </React.StrictMode>,
//);
