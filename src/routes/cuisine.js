const router = require('express').Router();
const cuisineController = require('../controllers/cuisine.js');

router.post('/create', cuisineController.create);

module.exports = router;