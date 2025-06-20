
// implement CRUD functionality with prisma

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// Set up expressJS connection

const express = require("express");
const dotenv = require("dotenv").config()


const app = express();

// implement json commpaitablity with expressJS

app.use(express.json())



class Orders {
    // Define a method for the class that retrieves order resources
    get(app){
        app.get("/orders", async (req, res) => {
            try {

                // Checks if parameter being passed is status or sort

                console.log("Successfully accessed Get Orders function")

                const orders = await prisma.order.findMany();
                const asc = req.query.asc === 'true';
                const status = req.query.status;
                const key = req.query.sort;

                let result = orders;


                if (status&& req.query.status) {

                // Checks if both status and sort are being passed

                console.log("Double Wammee");
                console.log(status);

                // Filters values for specific status

                result = result.filter((order)=>{
                    return result.status === status;
                })
                console.log(result)

                // Sort array by key
                sortHandler(result,key,asc);
                console.log(result);

                console.log("Sort Parameter: "+req.query.sort);
                }
                // Checks if a status is being passed

                else if (status){
                console.log(status)
                result = result.filter((order)=>{
                    return result.status === status;
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

    }

    // Define method that add resources into orders db array

    post(app){
        app.post("/orders", async (req,res)=>{

        try {

            const {customer,total, status, createdAt} = req.body
            console.log(req.body)
            const newOrders = await prisma.order.create({
            data:{
                customer,
                total,
                status,
                createdAt
            }
            })

            console.log("New resource created!")

            res.json(newOrders)
            
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: "Server error" });
        }

        })
    }

    // Define method that updates resources in orders array
    put(app){
        app.put("/orders/:id", async(req,res)=>{
        try {
            const { id } = req.params;
            const {customer, total, status, createdAt} = req.body;
            const updatedOrders = await prisma.order.update({
            where: {id: parseInt(id)},
            data:{
                customer,
                total,
                status,
                createdAt
            }
            })

            res.json(updatedOrders)
            
        } catch (error) {
            console.log(error.message)
        }

        })
    }

    // Defined method that deletes resources from orders

    delete(app){
        app.delete("/orders/:id",async (req,res)=>{
        try {
            const { id } = req.params

            const deletedOrder = await prisma.order.delete(
            {
                where:{id:parseInt(id)}
            }
            )

            res.json(deletedOrder)
            
        } catch (error) {
            console.log(error.message)
        }
        })
    }
}

// export Orders class

module.exports = Orders
