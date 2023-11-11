/* eslint-disable no-undef */
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

import atob from 'atob';

function App() {
  const [movies, setMovies] = useState([]);
  const [showsData, setShowsData] = useState([]);
  const [user, setUser] = useState(null);
  const [sessionKey, setSessionKey] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch movie data from your backend API
    fetch("http://localhost:3123/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data.movies))

    fetch("http://localhost:3123/api/shows")
      .then((response) => response.json())
      .then((data) => setShowsData(data.shows));

    // Check for existing user information in local storage
    const storedUser = localStorage.getItem("user");
    const storedSessionKey = localStorage.getItem("sessionKey");

    console.log("Stored User:", storedUser);
    if (storedUser !== null && storedSessionKey !== null) {
      try {
        setUser(JSON.parse(storedUser));
        setSessionKey(storedSessionKey);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing storedUser:', error);
      }
    } else {
      // Handle the case where storedUser or storedSessionKey is undefined
      console.error("Stored user or session key is undefined");
    }
  
    if (storedToken !== null) {
      try {
        // Decode the token to get user information
        const decodedToken = Buffer.from(storedToken, 'base64').toString('ascii');
        const parsedUser = JSON.parse(decodedToken);

        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

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
        console.log("Signin failed", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("API Response Data:", data);
      setUser(data.user);
      setSessionKey(data.sessionKey);
      setIsLoggedIn(true);

      if (data.message === "Signin successful") {
        console.log("Signin successful");
        setUser(data.username);
        setSessionKey(data.sessionKey);
        setIsLoggedIn(true);

      } else {
        console.log("Signin failed");
      }

      // Store user information in local storage
      console.log("Data to be stored:", data.user, data.sessionKey);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("sessionKey", data.sessionKey);
    } catch (error) {
      console.error("Error during sign in", error);
    }
  };

  const handleLogout = () => {
    // Add logic to clear user session, reset state, or perform any other logout actions
    setUser(null);
    setSessionKey(null);
    setIsLoggedIn(false);
  };

  return (
    <Router forceRefresh={true}>
      <div className='app'>
        <Navbar />
        <div className='nav-content'>
          {isLoggedIn ? (
            <div>
              <p>Välkommen!</p>
              <button onClick={handleLogout}>Logga ut</button>
            </div>
          ) : (
            <p>Please log in</p>
          )}
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
