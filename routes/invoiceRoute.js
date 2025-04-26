const {Router} = require('express');
const invoiceController = require('../controllers/invoiceController');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');


router.post('/invoice', invoiceController.storeInvoice);



module.exports = router