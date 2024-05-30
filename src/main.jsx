import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Login/Routes/register.jsx';
import App from './Login/App.jsx';
import './Login/App.css';

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
        <RouterProvider router={router} />
   </React.StrictMode>,
)