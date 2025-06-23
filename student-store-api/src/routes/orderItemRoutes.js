const express = require('express');
const router = express.Router();
const orderItemController = require('../controlers/orderItemControler.js');

router.post('/:id/create', orderItemController.createOrderItem);
router.get("/",orderItemController.getOrderItem)
router.put('/:id/update',orderItemController.updateOrderItem)
router.delete('/:id/delete',orderItemController.deleteOrderItem)

module.exports = router;