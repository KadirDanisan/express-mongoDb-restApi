const{createHotel, upDateHotel, deleteHotel, getSingleHotel, getAllHotels, typeByCount, typeByCity} = require('../controllers/hotel');
const express = require('express');

const {verifyAdmin} = require("../middleware/verify");

const router = express.Router();

router.post('/hotels', verifyAdmin, createHotel)
router.put('/hotels/:id',verifyAdmin, upDateHotel)
router.delete('/hotels/:id',verifyAdmin, deleteHotel)
router.get('/hotels/:id',getSingleHotel)
router.get('/hotels' , getAllHotels)
router.get('/hotels/countByType', typeByCount)
router.get('/hotels/typeByCity', typeByCity)


module.exports = router;