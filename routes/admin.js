const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');


router.get('/lokasyonekle', adminController.getLokasyonEkle);

router.post('/lokasyonekle', adminController.postLokasyonEkle);

router.get('/lokasyon', adminController.getLokasyon);

router.get('/lokasyon/:locationId', adminController.getLokasyonDuzenle);

router.post('/lokasyonduzenle', adminController.postLokasyonDuzenle);

router.post('/lokasyonsil', adminController.postDeleteLokasyon);

router.get('/user', adminController.getUser);

router.get('/user/:userId', adminController.getKullaniciDuzenle);

router.post('/kullaniciduzenle', adminController.postKullaniciDuzenle);

router.post('/usersil', adminController.postDeleteKullanici);



module.exports = router;