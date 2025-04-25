const {Router} = require('express');
const invoiceController = require('../controllers/invoiceController');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');


router.post('/invoice', invoiceController.storeInvoice);
router.get('/students', authMiddleware.requireAuth , invoiceController.retrieveStudents);


module.exports = router