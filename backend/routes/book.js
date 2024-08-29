const router = require('express').Router();
const user = require('../models/user');
const book = require("../models/book");
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./userAuth');

//add book
router.post("/add-book", authenticateToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const existUser = await user.findById(id);
        if(existUser.role !== "admin"){
            return res.status(400).json({message : "You cannot access admin work"});
        }
        const newBook = new book({
            url : req.body.url,
            title : req.body.title,
            author : req.body.author,
            price : req.body.price,
            desc : req.body.desc,
            language : req.body.language
        });
        await newBook.save();
        res.status(200).json({message : "Book added successfully"});
    }
    catch(err){
        return res.status(500).json({message : "Internal server Error"});
    }
});

//update book
router.put("/update-book", authenticateToken, async(req,res)=>{
    try{
        const {bookid} = req.headers;
        await book.findByIdAndUpdate(bookid,{
            url : req.body.url,
            title : req.body.title,
            author : req.body.author,
            price : req.body.price,
            desc : req.body.desc,
            language : req.body.language
        });
        return res.status(200).json({message : "Book updated successfully"});
    }
    catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
});

//delete-book
router.delete("/delete-book", authenticateToken, async(req,res)=>{
    try{
        const {bookid} = req.headers;
        await book.findByIdAndDelete(bookid);
        return res.status(200).json({message : "Book deleted successfully"});
    }
    catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
});

//get-all-books
router.get("/get-all-books", async(req,res)=>{
    try{
        const books = await book.find().sort({createdAt : -1});
        return res.json({
            status : "Success",
            data : books
        });
    }
    catch(err){
        res.status(500).json({Message : "Internal server error"});
    }
});

//get-recent-books
router.get("/get-recent-books", async(req,res)=>{
    try{
        const books = await book.find().sort({createdAt : -1}).limit(4);
        return res.json({
            status : "Success",
            data : books
        });
    }
    catch(err){
        res.status(500).json({Message : "Internal server error"});
    }
});

//get book by id
router.get("/get-book-by-id/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        const fbook = await book.findById(id);
        return res.json({
            status:"Success",
            data : fbook
        });
    }
    catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
})

module.exports = router;