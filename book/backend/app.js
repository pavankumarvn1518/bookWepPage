const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");



// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);


// Test route for root URL
app.get("/", (req, res) => {
    res.send("Server is running!");
});

const port = process.env.PORT || 1000;

app.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
    } else {
        console.log(`Server started on port ${port}`);
    }
});
