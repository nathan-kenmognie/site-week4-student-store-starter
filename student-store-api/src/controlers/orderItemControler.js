// implement CRUD functionality with prisma

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();





require("dotenv").config()



exports.getOrderItem = async(req, res) =>{
    try {
        // Get all order items with their related order and product information
        const orderItems = await prisma.orderItem.findMany({
            include: {
                order: true,
                product: true,
            }
        });

        res.json(orderItems);
                
    } catch (error) {
        console.log(error.message)
    }

}

exports.createOrderItem = async(req,res) =>{
    try {
        const { id } = req.params;
        const {productId, quantity,  price} = req.body

        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: { items: true }
        });

        if (!order) return res.status(404).json({ error: "Order not found" });

        const existingItem = order.items.find(i => i.productId === productId);



        let updatedOrderItem;
        
        if (existingItem) {
            // Update quantity
            updatedOrderItem = await prisma.orderItem.update({
                data: { orderId: parseInt(id),quantity: existingItem.quantity + quantity, price: price },
                where: { id: existingItem.id },
            });
        }else{
            // Update order fields
            updatedOrderItem = await prisma.orderItem.create({
                data: { orderId: parseInt(id), productId: productId, quantity: quantity, price: price},
                

            });
        }

        const updatedOrder = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: { items: true }
        });

        let total = 0;

        updatedOrder.items.forEach(item => {
            total += item.price * item.quantity;
        });

        const finalOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { total: total },
            include: { items: true }
        });


        

        res.json(updatedOrder);


        console.log("New resource created!")

        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Server error" });
    }
}

exports.updateOrderItem = async(req,res) =>{
    try {
        const { id } = req.params;
        const {orderId, productId, quantity,  price} = req.body;
        const updatedOrderItem = await prisma.orderItem.update({
            where: {id: parseInt(id)},
            data:{
                orderId,
                productId,
                quantity,
                price
            }
        })

        res.json(updatedOrderItem)
        
    } catch (error) {
        console.log(error.message)
    }
}


exports.deleteOrderItem = async(req,res) =>{
    try {
        const { id } = req.params

        const deletedOrderItem = await prisma.orderItem.delete(
        {
            where:{id:parseInt(id)}
        }
        )

        res.json(deletedOrderItem)
            
    } catch (error) {
        console.log(error.message)
    }
}