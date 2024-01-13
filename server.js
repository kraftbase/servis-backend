const config = require('./utils/config')
const cookieParser = require('cookie-parser')
const express = require('express')
const router = require('./routes/index')
const { errorMiddleware, ErrorHandler } = require('./controllers/errorHandler')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', router)

app.all('*', (req, res, next) => {
    next(new ErrorHandler('Requested route does not exist', 404))
})

app.use(errorMiddleware)

app.listen(config.PORT, () => {
    console.log(`Server running successfully at PORT ${config.PORT}`)
})
