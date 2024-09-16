const{createRoom, updateRoom, deleteRoom, getDetailRoom, getAllRooms } = require('../controllers/room');
const express = require("express");

const {verifyAdmin} = require("../middleware/verify");

const router = express.Router();

router.post('/createRoom/:id/:hotelId',verifyAdmin, createRoom)
router.put('/updateRoom/:id',verifyAdmin, updateRoom)
router.delete('/deleteRoom/:id/:hotelId',verifyAdmin, deleteRoom)
router.get('/getDetailRoom/:id',getDetailRoom)
router.get('/getAllRooms', getAllRooms)


module.exports = router;