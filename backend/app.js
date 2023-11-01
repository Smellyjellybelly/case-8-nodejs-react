const express = require("express");
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes");
const MovieRoutes = require("./routes/MovieRoutes");
const { getMoviesFromDB } = require("./models/utils");

const app = express();

//make it possible to serve other apps on the same computer
app.use(cors());

// in order to receive json data in req.body
app.use(express.json());

app.use(UserRoutes);
app.use(MovieRoutes);

const PORT = 3123;

// API endpoint to get a list of movies
app.get("/api/movies", (req, res) => {
    // Use your function to get movies from the database
    const movies = getMoviesFromDB();
    res.json(movies);
  });

app.get("/", (req, res) => {
    res.send({message: "Hello from backend"});
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT} `));