const {Router} = require('express');
const path = require('path');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');
const invoiceController = require('../controllers/invoiceController');

router.get('/student_form', authMiddleware.requireAuth , (req, res) => {
    res.sendFile(path.join(__dirname, '../protected/student_form.html'));
});

router.get('/student_list', authMiddleware.requireAuth , (req, res) => {
    res.sendFile(path.join(__dirname, '../protected/student_list.html'));
});

router.get('/students', authMiddleware.requireAuth , invoiceController.retrieveStudents);



module.exports = router;