import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styling/App.css';
import Register from './Login/Routes/register.jsx';
import ForgotPassword from './Login/Routes/forgotpassword.jsx';

import PatientOverview from './routes/PatientOverview.jsx';
import ResultOverview from './routes/ResultOverview.jsx';
import PatientView from './routes/PatientView.jsx';
import MyometriePage from './routes/MyometriePage.jsx';
import EssayPage from './routes/EssayPage.jsx';
import RadiologyPage from './routes/RadiologyPage.jsx';
import PatientSettingsPage from './routes/PatientSettingsPage.jsx';
import PatientList from './components/PatientList.jsx';
import Kalender from './routes/Kalender.jsx';



const router = createBrowserRouter([
    { path: "/", element: <App/> },
    { path: "/patientoverview", element: <PatientOverview /> },
    { path: "/patientview/:patientId", element: <PatientView /> },
    { path: "/resultoverview/:patientId", element: <ResultOverview /> },
    { path: "/myometriepage/:patientId", element: <MyometriePage /> },
    { path: "/essaypage/:patientId", element: <EssayPage /> },
    { path: "/radiologypage/:patientId", element: <RadiologyPage /> },
    { path: "/patientsettingspage/:patientId", element: <PatientSettingsPage /> },
    { path: "/patientlist", element: <PatientList /> },
    { path: "/kalender", element: <Kalender /> },
    { path: "/", element: <App /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
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
