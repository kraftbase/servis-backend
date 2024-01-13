const express = require('express')
const PIController = require('../controllers/PIController')
const router = express.Router()

router.post('/', PIController.generatePI)
router.get('/', PIController.getAllPIs)
router.get('/:id', PIController.getPIById)
router.delete('/:id', PIController.deletePIById)
router.patch('/:id', PIController.updatePIById)

module.exports = router