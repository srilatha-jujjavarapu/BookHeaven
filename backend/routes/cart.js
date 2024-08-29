const router = require('express').Router();
const user = require('../models/user');
const book = require("../models/book");
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./userAuth');

//add to cart
router.put("/add-to-cart", authenticateToken, async (req,res)=>{
    try{
        const {bookid , id} = req.headers;
        const userData = await user.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if(isBookInCart){
            return res.json({
                status : "Success",
                message : "Book is already in cart"
            });
        }
        await user.findByIdAndUpdate(id, {$push : {cart : bookid}});
        res.status(200).json({message : "Book added to cart"});
    }
    catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
});

//remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req,res)=>{
    try{
        const {bookid} = req.params;
        const {id} = req.headers;
        await user.findByIdAndUpdate(id, {$pull : {cart : bookid}});
        res.json({
            status : "Success",
            message : "Book removed from cart"});
    }
    catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
});

//get cart of a particular user
router.get("/get-user-cart", authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await user.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status : "Success",
            data : cart
        });
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
})

module.exports = router;