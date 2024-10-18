const express = require ('express');

const router = express.Router();
const userController = require ('../controllers/userController')

router
.route('/create')
.post(userController.createUser);

router
.route('/signin')
.post(userController.LoginUser);


module.exports=router;