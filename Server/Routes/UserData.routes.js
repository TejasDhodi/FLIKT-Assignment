const express = require('express');
const { addUserData, updateUserData, getAllUserData, deleteUserData, getSingleUserData } = require('../Controller/UserData.controller');

const router = express.Router();

router.get('/allData', getAllUserData);
router.get('/singleData/:id', getSingleUserData);
router.post('/add', addUserData);
router.put('/update/:id', updateUserData);
router.delete('/delete/:id', deleteUserData);
module.exports = router;