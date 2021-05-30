const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/havadurumu', userController.getHavaDurumu);
router.post('/havadurumu', userController.postHavaDurumu);

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/logout', userController.getLogout);

router.get('/raporlar', userController.getRapor);


module.exports = router;