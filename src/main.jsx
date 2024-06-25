import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './routes/register.jsx';
import ForgotPassword from './routes/forgotpassword.jsx';
import PatientOverview from './routes/PatientOverview.jsx';
import ResultOverview from './routes/ResultOverview.jsx';
import PatientView from './routes/PatientView.jsx';
import MyometriePage from './routes/MyometriePage.jsx';
import EssayPage from './routes/EssayPage.jsx';
import RadiologyPage from './routes/RadiologyPage.jsx';
import PatientSettingsPage from './routes/PatientSettingsPage.jsx';
import PatientList from './components/PatientList.jsx';
import Kalender from './routes/Kalender.jsx';
import PatientDashboard from './routes/PatientDashboard.jsx';
import DocMenuTest from './menuTests/doctormenu.jsx'
import PatMenuTest from './menuTests/patientmenu.jsx'
import ResMenuTest from './menuTests/researchermenu.jsx'
import AdminMenu from './menuTests/adminmenu.jsx';
import ResetPassword from './routes/resetpassword.jsx';



const router = createBrowserRouter([
    { path: "/", element: <App/> },
    { path: "/patientoverview", element: <PatientOverview /> },
    { path: "/patientview/:patientId", element: <PatientView /> },
    { path: "/resultoverview/:patientId", element: <ResultOverview /> },
    { path: "/myometriepage/:patientId/:resultId", element: <MyometriePage /> },
    { path: "/essaypage/:patientId", element: <EssayPage /> },
    { path: "/radiologypage/:patientId`/:resultId", element: <RadiologyPage /> },
    { path: "/patientsettingspage/:patientId", element: <PatientSettingsPage /> },
    { path: "/patientlist", element: <PatientList /> },
    { path: "/kalender", element: <Kalender /> },
    { path: "/", element: <App /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/patientdashboard", element: <PatientDashboard /> },    
    { path: "/patientdashboard/:patientId", element: <PatientDashboard /> },    
    { path: "/docmenu", element: <DocMenuTest /> },
    { path: "/patmenu", element: <PatMenuTest /> },
    { path: "/resmenu", element: <ResMenuTest /> },
    { path: "/adminmenu", element: <AdminMenu />},
    { path: "/reset-password/:token", element: <ResetPassword /> }
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
