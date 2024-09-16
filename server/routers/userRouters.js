const { getAllUsers, deleteUser, detailUser, updateUser} = require("../controllers/user");
const express = require("express");

const {verifyAdmin, verifyUser} = require("../middleware/verify");

const router = express.Router();

router.put('/updateUser/:id',verifyUser, updateUser)
router.delete('/deleteUser/:id',verifyUser, deleteUser)
router.get('/detailUser/:id',verifyUser, detailUser)
router.get('/getAllUsers',verifyAdmin, getAllUsers)


module.exports = router;