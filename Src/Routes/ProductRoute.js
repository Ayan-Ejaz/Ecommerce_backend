const express = require('express')
const router = express.Router();
const {isAdmin} = require('../Middlewares/verifyAdminRole')
const {
    addProductController, 
    updateProductController, 
    deleteProductController, 
    listProductController} 
= require('../Controller/ProductController');
const {
    addProductRules,
    updateProductRules,
    deleteProductRules,
} = require('../Middlewares/validators/productValidator')
const handleValidationErrors = require('../Middlewares/handleValidationErrors');


router.post('/add-product', addProductRules(), handleValidationErrors, addProductController)
router.put('/update-product/:id', updateProductRules, handleValidationErrors, updateProductController)
router.delete('/delete-product',deleteProductRules, handleValidationErrors, deleteProductController)
router.post('/list-products', listProductController)

module.exports = router;