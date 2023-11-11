import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Components/Navbar';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import About from './Pages/About';
import Search from './Pages/Search';
import Showing from "./Pages/Showing";
import MovieDetails from "./Components/MovieDetails";
import BookPage from "./Components/Bookpage";

function App() {
  const [movies, setMovies] = useState([]);
  const [showsData, setShowsData] = useState([]);
  const [user, setUser] = useState(null);
  const [sessionKey, setSessionKey] = useState(null);

  useEffect(() => {
    // Fetch movie data from your backend API
    fetch("http://localhost:3123/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data.movies))

    fetch("http://localhost:3123/api/shows")
      .then((response) => response.json())
      .then((data) => setShowsData(data.shows));

  }, []);

   const handleSignIn = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3123/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        console.log("Signin failed");
        return;
      }

      const data = await response.json();
      setUser(data.username);
      setSessionKey(data.sessionKey);
    } catch (error) {
      console.error("Error during sign in", error);
    }
  };

  return (
    <Router forceRefresh={true}>
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
              <Search movies={movies} />
            </Route>
            <Route path="/Showing">
              <Showing movies={movies} showsData={showsData} />
            </Route>
            <Route path="/MovieDetails/:movieId">
              <MovieDetails movies={movies} />
            </Route>
            <Route path="/Bookpage/:showId/:movieId">
              <BookPage showsData={showsData} movies={movies} />
            </Route>
            <Route path="/SignIn">
              <SignIn onSignIn={handleSignIn} />
            </Route>
          </Switch>
        </div>
      </div>

    </Router>
  );
}

export default App;
