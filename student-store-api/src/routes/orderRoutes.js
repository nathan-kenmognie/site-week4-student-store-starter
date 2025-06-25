const express = require('express');
const router = express.Router();
const orderController = require('../controlers/orderControler.js');

router.post('/create', orderController.createOrder);
router.get("/",orderController.getOrders)
router.get("/:email/email",orderController.getOrderByEmail)

router.get("/:id",orderController.getOrderById)
router.get('/:id/total', orderController.getOrderTotal)
router.put('/:id/update',orderController.updateOrder)


router.delete('/:id/delete',orderController.deleteOrder)

module.exports = router;


