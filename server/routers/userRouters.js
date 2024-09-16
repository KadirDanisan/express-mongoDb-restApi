const { getAllUsers, deleteUser, detailUser, updateUser} = require("../controllers/user");
const express = require("express");

const {verifyAdmin, verifyUser} = require("../middleware/verify");

const router = express.Router();

router.put('/user/:id',verifyUser, updateUser)
router.delete('/user/:id',verifyUser, deleteUser)
router.get('/user/:id',verifyUser, detailUser)
router.get('/user',verifyAdmin, getAllUsers)


module.exports = router;