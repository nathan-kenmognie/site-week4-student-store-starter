
// import orders class from order.js


const Orders = require("./order")
const orders = new Orders();


// implement CRUD functionality with prisma


const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// Set up expressJS connection

const express = require("express");

const dotenv = require("dotenv").config()


const app = express();

// implement json commpaitablity with expressJS

app.use(express.json())

// Establish listening port

PORT = process.env.PORT || 5000;


// basic route config to as proof of concept

app.get(("/"), (req,res)=>{
    res.send("Hello World!")
})


//< ----- GET CRUD functionality with prisma ------>


// function to sort arrays by keys

const sortHandler = (arr, key, asc) => {
  arr.sort((a,b)=>{
    const aVal = a[key];
    const bVal = b[key];

    if (typeof aVal === "string" && typeof bVal === "string"){
      if (asc){
        return a[key].localeCompare(b[key])
      }else{
        return b[key].localeCompare(a[key])
      }

    }else{
      if (asc){
        return a[key] - b[key];
      }else{
        return b[key] - a[key];
      }
    }
  })
};



app.get("/products", async (req, res) => {
  try {

    // Checks if parameter being passed is category or sort

    const products = await prisma.product.findMany();
    const asc = req.query.asc === 'true';
    const category = req.query.category;
    const key = req.query.sort;

    let result = products;


    if (category&& req.query.category) {

      // Checks if both category and sort are being passed

      console.log("Double Wammee");
      console.log(category);

      // Filters values for specific category

      result = result.filter((product)=>{
        return result.category === category;
      })
      console.log(result)

      // Sort array by key
      sortHandler(result,key,asc);
      console.log(result);

      console.log("Sort Parameter: "+req.query.sort);
    }
    // Checks if a category is being passed

    else if (category){
      console.log(category)
      result = result.filter((product)=>{
        return result.category === category;
      })
      console.log(result)
    } 
    // Checks if sort paramenter is being passed

    else if (req.query.sort){
      console.log(key)

      sortHandler(result,key,asc)
      console.log(result)
    } 

    res.json(result);
    
  } catch (error) {
    console.log(error.message)
  }

});

//< ----- POST CRUD functionality with prisma ------>


// POST CRUD functionality with prisma

app.post("/products", async (req,res)=>{

  try {

    const {name, category, image_url, description,  price} = req.body
    console.log(req.body)
    const newProduct = await prisma.product.create({
      data:{
        name,
        category,
        image_url,
        description,
        price
      }
    })

    console.log("New resource created!")

    res.json(newProduct)
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Server error" });
  }

})


//< ----- PUT CRUD functionality with prisma ------>

// PUT CRUD functionality with prisma

app.put("/products/:id", async(req,res)=>{
  try {
    const { id } = req.params;
    const {name, category, image_url, description,  price} = req.body;
    const updatedProducts = await prisma.product.update({
      where: {id: parseInt(id)},
      data:{
          name,
          category,
          image_url,
          description,
          price
      }
    })

    res.json(updatedProducts)
      
  } catch (error) {
    console.log(error.message)
  }

})

//< ----- DELETE CRUD functionality with prisma ------>


// DELETE CRUD functionality with prisma

app.delete("/products/:id",async (req,res)=>{
  try {
    const { id } = req.params

    const deletedProduct = await prisma.product.delete(
      {
        where:{id:parseInt(id)}
      }
    )

    res.json(deletedProduct)
    
  } catch (error) {
    console.log(error.message)
  }
})

// Setting up Orders CRUD

orders.get(app);
orders.post(app)
orders.put(app)
orders.delete(app)

// Console debug message confirming server is active

app.listen(PORT, ()=>{
    console.log(`Server is successfully runnning on http://localhost:${PORT}`)
})