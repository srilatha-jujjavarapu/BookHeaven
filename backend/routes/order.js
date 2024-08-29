const router = require('express').Router();
const order = require('../models/order');
const book = require("../models/book");
const user = require("../models/user");
const {authenticateToken} = require('./userAuth');

//place order 
router.post("/place-order",authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const {orders} = req.body;
        for(const orderData of orders){
            const newOrder = new order({user : id, book : orderData._id});
            const orderDataFromDb = await newOrder.save();
            await user.findByIdAndUpdate(id,{
                $push : {orders : orderDataFromDb._id}
            });
            await user.findByIdAndUpdate(id,{
                $pull : {cart : orderData._id}
            });
        }
        return res.json({
            status : "Success",
            message : "Order placed successfully"
        })
    }
    catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
});

//get order history of a particular user
router.get("/get-order-history", authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await user.findById(id).populate({
            path : "orders",
            populate : {path : "book"}
        });
        const ordersData = userData.orders.reverse();
        return res.json({
            status : "Success",
            data : ordersData
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal server error"});
    }
});

//get all orders - admin
router.get("/get-all-orders", authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await order.find()
        .populate({
            path : "book"
        })
        .populate({
            path : "user"
        })
        .sort({createdAt : -1});
        return res.json({
            status : "Success",
            data : userData
        })
    }
    catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
});

//update status 
router.put("/update-status/:id", authenticateToken, async(req,res)=>{
    try{
        const {id} = req.params;
        await order.findByIdAndUpdate(id, { status : req.body.status});
        return res.json({
            status : "Success",
            message : "Status updated successfully"
        })
    }
    catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
});

module.exports = router;