import './App.css';
import ReactLogo from './assets/react.svg'
import DataDisplay from './DataDisplay';
import DataSender from './DataSender';
import DataGridFiller from './DataGridFiller';

function App() {
  return (
      <>
          <nav>
              <ul>
                  <div className="navitems">
                      <img src={ReactLogo} alt="React Logo" className="nav-logo" />
                      <h1 className="homeheader">Welcome to My First React App</h1>
                  </div>
                  <div className="navitems">
                      <li><a href="/">Home</a></li>
                      <li><a href="/about">About</a></li>
                      <li><a href="/contact">Contact</a></li>
                  </div>
                  {/* Add more <li> elements as needed */}
              </ul>
          </nav>
          <div className="app">
              <div className="data-display">
                  <DataDisplay />
              </div>
              <div className="data-sender">
                  <DataSender />
              </div>
              <div className="data-grid-filler">
                  <DataGridFiller />
              </div>
          </div>
      </>
  );
}

export default App;