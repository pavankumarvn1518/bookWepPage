const router = require("express").Router();
const User = require("../modeles/user");

// Sign up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check username length
        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check password length
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password's length should be greater than 5" });
        }    

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            address: address,
        });
        await newUser.save();
        return res.status(200).json({ message: "Signup successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
