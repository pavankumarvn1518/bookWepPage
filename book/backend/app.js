const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");






// app.use(cors({
//   origin: 'http://localhost:5173', // Adjust this based on your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);





// Test route for root URL
// app.get("/", (req, res) => {
//     res.send("Server is running!");
// });

const port = process.env.PORT || 1000;

app.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
    } else {
        console.log(`Server started on port ${port}`);
    }
});
