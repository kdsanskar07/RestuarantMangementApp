const router = require('express').Router();   
const orderController = require('../controllers/order.js');

router.post('/create', orderController.create);
router.get('/userorder', orderController.orderByUserId);
router.get('/ownerorder', orderController.allOrder);
router.post('/servefood', orderController.serveFood);

module.exports = router;