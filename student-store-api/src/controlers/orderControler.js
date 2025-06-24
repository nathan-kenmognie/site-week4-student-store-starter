// implement CRUD functionality with prisma

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();





exports.createOrder = async(req,res) =>{
    const {customer,total, status, createdAt,email, orderItems} = req.body

    

    try {

            
        console.log(req.body)
        const newOrders = await prisma.order.create({
        data:{
            customer,
            email,
            total:total,
            status,
            createdAt,
            items:{
                create: orderItems,
            },
        },
        include:{
            items:true
        }

        })

        console.log("New resource created!")

        res.json(newOrders)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Server error" });
    }

}

exports.getOrders = async(req,res) =>{
    try {
        const orders = await prisma.order.findMany({
            include:{
                items:{
                    include:{
                        product:true
                    }                }
            }
        })

        res.json(orders)
        
    } catch (error) {
        console.log(error.message)
    }
}

exports.getOrderById = async( req,res) =>{
    try {
        const id = req.params.id;

        const order = await prisma.order.findUnique({
            where:{
                id: parseInt(id)
            },
            include: {
                items: {
                    include:{
                        product:true
                    }
                } 
            }
        })
        
        if (!order) return res.status(404).json({ error: 'Order not found' });


        res.json(order)
        
    } catch (error) {
        console.log(error.message)
    }

}

exports.getOrderByEmail = async(req,res) =>{
    try {
        const email = req.params.email;

        const orders = await prisma.order.findMany()

        const filteredData = orders.filter((order) =>{
            return order.email === email
        })

        if (!filteredData) return res.status(404).json({ error: 'Order not found' });
        
        res.json(filteredData)
    } catch (error) {
        console.log(error.message)
    }
}


exports.getOrderTotal = async(req,res) =>{
    try {
        const id = req.params.id;
        const order =  await prisma.order.findUnique({
            where: {id:parseInt(id)||undefined},
            include:{
                items:true
            }
        })

        let total = 0;

        order.items.map((item)=>{
            const subtotal = item.price*item.quantity;
            total+=subtotal;
        })

        const updatedOrder = await prisma.order.update({
            where:{id:parseInt(id)||undefined},
            data:{
                total: total
            }
        })

        res.json(updatedOrder)






    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: "Server Error"});
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { customer, status, createdAt, orderItems } = req.body;

        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: { items: true }
        });

        if (!order) return res.status(404).json({ error: "Order not found" });

        // Update or create each item
        for (const item of orderItems) {
            const existingItem = order.items.find(i => i.productId === item.productId);
            if (existingItem) {
                // Update quantity
                await prisma.orderItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + item.quantity }
                });
            }
        }
        let total = 0;


        order.items.map((item)=>{
            const subtotal = item.price*item.quantity;
            total+=subtotal;
        })

        // Update order fields
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { customer, total, status, createdAt },
            include: { items: true },
        });

        res.json(updatedOrder);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server error" });
    }
}


exports.deleteOrder = async(req, res) =>{
    try {
        const { id } = req.params

        await prisma.orderItem.deleteMany({
            where:{orderId:parseInt(id)}
        })

        const deletedOrder = await prisma.order.delete({
            where:{id:parseInt(id)}
        })

        res.json(deletedOrder)
            
    } catch (error) {
        console.log(error.message)
    }
}


