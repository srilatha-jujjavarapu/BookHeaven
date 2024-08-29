const router = require('express').Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./userAuth');

//Sign Up
router.post("/sign-up", async (req,res)=>{
    try{
        const {username, email, password, address} = req.body;
        if(username.length < 4){
            return res.status(400).json({message: "Username length should be greater than 3"});
        }
        const existUsername = await user.findOne({username : username});
        if(existUsername){
            return res.status(400).json({message : "Username already exists"});
        }
        const existEmail = await user.findOne({email : email});
        if(existEmail){
            return res.status(400).json({message : "Email already exists"});
        }
        if(password.length <= 5){
            return res.status(400).json({message : "Password length should be greater than 5"});
        }
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new user({
            username : username,
            email : email,
            password : hashPass,
            address : address
        });
        await newUser.save();
        return res.status(200).json({message : "Signup successfully"});
    }catch(err){
        res.status(500).json({message : "Internal Server Error"});
    }
});

//Sign In
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if the user exists
        const existUser = await user.findOne({ username: username });
        if (!existUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        // Compare password with hashed password
        const match = await bcrypt.compare(password, existUser.password);
        if (match) {
            const authClaims = [
                { name: existUser.username },
                { role: existUser.role },
            ];
            const token = jwt.sign({ authClaims }, "bookStore123", { expiresIn: "60d" });

            return res.status(200).json({ id: existUser._id, role: existUser.role, token: token, message: "Signin successful" });
        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


//Get user information
router.get("/get-user-information", authenticateToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const data = await user.findById(id).select(`-password`);
        return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
});

//update address
router.put("/update-address", authenticateToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await user.findByIdAndUpdate(id,{address : address});
        return res.status(200).json({message : "Address updated successfully"});
    }catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
})

module.exports = router;