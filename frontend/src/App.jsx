import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';


function App() {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch("http://localhost:3123")
      .then(res => res.json())
      .then(data => setMessage(data))
      .catch(err => console.log(err));
  }, [])

  return (
    <Router>
      <div className='app'>
        <Navbar />
        <div className='nav-content'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route >
            <Route path="/About">
              <About />
            </Route>
          </Switch>

        </div>

        <div>
          <p>Hello from frontend</p>
          <p>{message.message}</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
