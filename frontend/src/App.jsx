import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
// import Search from './Pages/Search';


function App() {

  const [movies, setMovies] = useState([]); // Add state for movies

  useEffect(() => {
    // Fetch movies from your API endpoint
    fetch("http://localhost:3123/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data)) // Store movies in state
      .catch((err) => console.log(err));
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
          
          </Switch>

        </div>

        <div>
            <h2>Movies</h2>
            <ul>
              {movies.map((movie) => (
                <li key={movie.movieid}>{movie.title}</li>
              ))}
            </ul>
          </div>
      </div>
    </Router>
  );
}

export default App;
