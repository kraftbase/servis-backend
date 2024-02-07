const config = require('../utils/config')
class ErrorHandler extends Error {
    constructor (message, statusCode) {
        super(message)
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.statusCode = statusCode
        this.isOperational = true
        // this.message = message
        // Error.captureStackTrace(this, this.constructor);
    }
}

const sendDevError = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}

const sendProdError = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

const formatErrors = (err) => {
    if (err.isOperational) return err

    if (err.isAjvError) {
        return new ErrorHandler(`insufficient data provided: ${err.errors}`, 400)
    } else if (err.name === 'CastError') {
        return new ErrorHandler(`Invalid ${err.path}: ${err.value}`, 400)
    } else if (err.name === 'JsonWebTokenError') {
        return new ErrorHandler('JWT missing!', 400)
    } else if (err.name === 'ValidationError') {
        return new ErrorHandler(err.message, 400)
    } else if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0]
        const message = `${field} with ${err.keyValue[field]} already exists in the database`
        return new ErrorHandler(message, 400)
    } else {
        console.error(`Unknown error occurred: ${err}`)
        return new ErrorHandler('Internal server error occurred!', 500)
    }
}

const errorMiddleware = (error, req, res, next) => {
    const err = error instanceof ErrorHandler ? error : formatErrors(error)
    if (config.NODE_ENV === 'dev') {
        sendDevError(err, res)
    } else {
        sendProdError(err, res)
    }
}

module.exports = {
    ErrorHandler,
    errorMiddleware
}
