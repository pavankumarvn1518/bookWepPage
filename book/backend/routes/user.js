const router = require("express").Router();
const User = require("../modeles/user");
const bcrypt = require("bcryptjs");  // for encripting password
const jwt = require("jsonwebtoken")
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
      
        const hashPass =  await bcrypt.hash(password,10); // it is used to encript password

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashPass ,
            address: address,
        });
        await newUser.save();
        return res.status(200).json({ message: "Signup successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//sign-in
router.post("/sign-in", async (req, res) => {
    try{
        const { username,password}= req.body;
    
    const existingUser = await User.findOne({username});
    if(!existingUser)
        {
            res.status(600).json({message:"Invalid credentials"})
        }
    await bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){
            const token=jwt.sign({authClalms},"bookStore123",
                {expiresIn:"30d"
                    });
            res.status(200).json({message:"SignIn successfully"})

        }
        else{
            res.status(100).json({message:"Invalid credentials"})

        }
    })
    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
