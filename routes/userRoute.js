const { Router } = require('express');
const userController = require('../controllers/userController')
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', authMiddleware.requireAuth,  userController.logout);
router.get('/', guestMiddleware.guestAuth, userController.login_form);
router.get('/register', guestMiddleware.guestAuth, userController.register_form);

module.exports = router;

