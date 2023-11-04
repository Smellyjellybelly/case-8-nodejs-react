const express = require("express");
const path = require("path");
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes");
const MovieRoutes = require("./routes/MovieRoutes");

const app = express();

//make it possible to serve other apps on the same computer
app.use(cors());

// in order to receive json data in req.body
app.use(express.json());


app.use(UserRoutes);
app.use(MovieRoutes);

const PORT = 3123;

// Define an API endpoint to serve the movie data
app.get("/api/movies", (req, res) => {
    // You can send the movie data as a response
    const movieData = require("./db/movies.json"); // Load the JSON data
    res.json(movieData);
});

app.get("/api/shows", (req, res) => {
    const showData = require("./db/shows.json");
    res.json(showData);
});

app.get("/api/seatings", (req, res) => {
    const seatingData = require("./db/seatings.json");
    res.json(seatingData);
});



app.listen(PORT, () => console.log(`Server is listening on port ${PORT} `));