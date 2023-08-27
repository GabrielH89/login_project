const express = require('express');
const {getUser, addUser, loginUser, deleteUser} = require('../controller/userController');

const router = express.Router();

router.get("/", getUser);
router.post("/addUser", addUser);
router.post("/loginUser", loginUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;