
const productRouter = require('./routes/productRoute.js')

const orderRouter = require('./routes/orderRoutes.js')

const orderItemRouter = require('./routes/orderItemRoutes.js')


// Set up expressJS connection

const express = require("express");
const cors = require('cors');

require("dotenv").config()


const app = express();

PORT = process.env.PORT

app.use(cors());

app.use(express.json())

app.get('/', (req,res)=>{
  console.log("Main page accessed")
})

app.use("/products", productRouter)
app.use("/orders", orderRouter)
app.use("/orderItems", orderItemRouter)

// Console debug message confirming server is active



app.listen(PORT, ()=>{
    console.log(`Server is successfully runnning on http://localhost:${PORT}`)
})