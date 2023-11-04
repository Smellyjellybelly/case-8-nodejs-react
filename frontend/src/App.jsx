import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Search from './Pages/Search';
import Showing from "./Pages/Showing";
// import Booking from "./Pages/Booking";


function App() {
  const [movies, setMovies] = useState([]);
  const [showsData, setShowsData] = useState([]);
  const [seatingsData, setSeatingsData] = useState([]); // Define seating data state

  useEffect(() => {
    // Fetch movie data from your backend API
    fetch("http://localhost:3123/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data.movies))
      .catch((error) => console.error("Error fetching movies: ", error));

      fetch("http://localhost:3123/api/shows")
      .then((response) => response.json())
      .then((data) => setShowsData(data.showsData));
    
    fetch("http://localhost:3123/api/seatings")
      .then((response) => response.json())
      .then((data) => setSeatingsData(data.seatingsData));
  }, []);

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
            <Route path="/Search">
            <Search movies={movies} showsData={showsData} seatingsData={seatingsData} />
            </Route>
            <Route path="/Showing">
              <Showing movies={movies} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
