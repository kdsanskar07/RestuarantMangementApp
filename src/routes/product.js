const router = require('express').Router();
const productController = require('../controllers/product.js');

router.post('/create', productController.create);
router.post('/update', productController.update);
router.post('/remove', productController.remove);
router.get('/getall', productController.getAll);

module.exports = router;