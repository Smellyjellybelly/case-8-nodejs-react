const express = require("express");
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes");

const app = express();

//make it possible to serve other apps on the same computer
app.use(cors());

// in order to receive json data in req.body
app.use(express.json());

app.use(UserRoutes);

const PORT = 3123;

app.get("/", (req, res) => {
    res.send({message: "Hello from backend"});
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT} `));