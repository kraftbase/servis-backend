const express = require('express')
const PIRoutes = require('../routes/PIRoutes')
const userRoutes = require('../routes/userRoutes')
const fcRoutes = require('./fcRoutes')
const materialRoutes = require('./materialRoutes')
const supplierRoutes = require('./suppliersRoutes')
const authRoutes = require('./authRoutes')

const router = express.Router()

router.use('/pi',PIRoutes)
router.use('/user', userRoutes)
router.use('/fc',fcRoutes)
router.use('/auth',authRoutes)
router.use('/material',materialRoutes)
router.use('/supplier',supplierRoutes)

module.exports = router
