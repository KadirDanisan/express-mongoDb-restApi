const{createRoom, updateRoom, deleteRoom, getDetailRoom, getAllRooms } = require('../controllers/room');
const express = require("express");

const {verifyAdmin} = require("../middleware/verify");

const router = express.Router();

router.post('/rooms/:id/:hotelId',verifyAdmin, createRoom)
router.put('/rooms/:id',verifyAdmin, updateRoom)
router.delete('/rooms/:id/:hotelId',verifyAdmin, deleteRoom)
router.get('/rooms/:id',getDetailRoom)
router.get('/rooms', getAllRooms)


module.exports = router;