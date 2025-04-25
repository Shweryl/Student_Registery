const { Router } = require('express');
const userController = require('../controllers/userController')

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/login', userController.login_form);
router.get('/register', userController.register_form);

module.exports = router;

