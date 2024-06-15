const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Successfully connected to DB");
    } catch (error) {
        console.error("Error connecting to DB", error);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

module.exports = connectDB;


