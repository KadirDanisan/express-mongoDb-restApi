const{createHotel, upDateHotel, deleteHotel, getSingleHotel, getAllHotels, typeByCount, typeByCity} = require('../controllers/hotel');
const express = require('express');

const {verifyAdmin} = require("../middleware/verify");

const router = express.Router();

router.post('/createHotel', verifyAdmin, createHotel)
router.put('/upDateHotel/:id',verifyAdmin, upDateHotel)
router.delete('/deleteHotel/:id',verifyAdmin, deleteHotel)
router.get('/getSingleHotel/:id',getSingleHotel)
router.get('/getAllHotels' , getAllHotels)
router.get('/typeByCount', typeByCount)
router.get('/typeByCity', typeByCity)


module.exports = router;