const express = require('express')
const PIRoutes = require('../routes/PIRoutes')
const userRoutes = require('../routes/userRoutes')
const router = express.Router()

router.use('/pi',PIRoutes)
router.use('/user', userRoutes)

module.exports = router
