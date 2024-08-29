const{createRoom, updateRoom, deleteRoom, getDetailRoom, getAllRoom } = require('../controllers/room');
const express = require("express");

const {verifyAdmin} = require("../middleware/verify");

const router = express.Router();

router.post('/createRoom/:id/:hotelId',verifyAdmin, createRoom)
router.put('/updateRoom/:id',verifyAdmin, updateRoom)
router.delete('/deleteRoom/:id/:hotelId',verifyAdmin, deleteRoom)
router.get('/getDetailRoom/:id',getDetailRoom)
router.get('/getAllRoom', getAllRoom)


module.exports = router;