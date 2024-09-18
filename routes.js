//import express
const express = require('express')

//import userController
const userController= require('./controller/userController')

//import productController
const complaintController = require('./controller/complaintController')

//import adminController
const adminController= require('./controller/adminController')

const jwt = require('./middleware/jwtMiddleware')

//import multerConfig

const multerConfig =  require('./middleware/multerMiddleware')



//2)create an object for router class
const router= new express.Router()

//setup path for each request

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//addComplaint
router.post('/addcomplaint',jwt,multerConfig.single('documents'),complaintController.addComplaintController)


//edit profile
router.put('/edit-profile',jwt,multerConfig.single('profile'),userController.editProfileController)

//userComplaint
router.get('/usercomplaint',jwt,complaintController.userComplaintController)

//admin


//register
router.post('/adminregister',adminController.adminRegisterController)


//login
router.post('/adminlogin',adminController.adminLoginController)

//all complaints
router.get('/allcomplaints',jwt,complaintController.getAllComplaintsController)

//Delete
router.delete('/delete/:id',complaintController.deleteComplaintController)


//export the router
module.exports = router