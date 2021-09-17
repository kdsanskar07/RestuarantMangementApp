const router = require('express').Router();

router.use('/auth', require('./auth.js'));
router.use('/product', require('./product.js'));
router.use('/order', require('./order.js'));
router.use('/cuisine', require('./cuisine.js'));


module.exports = router;