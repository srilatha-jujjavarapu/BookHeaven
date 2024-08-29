const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
require("dotenv").config();
require("./conn/conn");

const user = require("./routes/user");
const book = require("./routes/book");
const fav = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");

app.use(cors());
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",book);
app.use("/api/v1",fav);
app.use("/api/v1",cart);

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at ${process.env.PORT}`);
});
