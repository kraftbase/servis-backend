const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.post('/',userController.createUser)
router.get('/',userController.getAllUsers)
router.get('/:id',userController.getUserById)
router.patch('/:id',userController.updateUserById)
router.delete('/',userController.deleteUserById)

module.exports = router