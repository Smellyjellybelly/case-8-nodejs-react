/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import Navbar from './Components/Navbar';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import About from './Pages/About';
import Search from './Pages/Search';
import Showing from "./Pages/Showing";
import MovieDetails from "./Components/MovieDetails";
import BookPage from "./Components/Bookpage";

function App() {
  const [user, setUser] = useState(null);
  const [sessionKey, setSessionKey] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Check for existing user information in local storage
    const storedUser = localStorage.getItem("username");
    const storedSessionKey = localStorage.getItem("sessionKey");

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

  }, []);

  const handleSignIn = async (credentials, history) => {
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

      if (data.message === "Signin successful") {
        console.log("Signin successful");
        setUser(data.username);
        setSessionKey(data.sessionKey);
        setIsLoggedIn(true);

        // Store user information in local storage
        localStorage.setItem("user", JSON.stringify(data.username));
        localStorage.setItem("sessionKey", data.sessionKey);

      
      } else {
        console.log("Signin failed");
      }

    } catch (error) {
      console.error("Error during sign in", error);
    }
  };

  const handleLogout = () => {
    // Add logic to clear user session, reset state, or perform any other logout actions
    setUser(null);
    setSessionKey(null);
    setIsLoggedIn(false);

    // Clear user information from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("sessionKey");

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
            </Route>
            <Route path="/About">
              <About />
            </Route>
            <Route path="/Search">
              <Search />
            </Route>
            <Route path="/Showing">
              <Showing />
            </Route>
            <Route path="/MovieDetails/:movieId">
              <MovieDetails />
            </Route>
            <Route path="/Bookpage/:showId/:movieId">
              <BookPage />
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
