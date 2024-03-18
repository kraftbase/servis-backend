// Importing configuration utility
const config = require("../utils/config");

// Custom error class extending Error
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    // Determining error status based on statusCode
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.statusCode = statusCode;
    this.isOperational = true; // Flag indicating whether the error is operational
    // this.message = message
    // Error.captureStackTrace(this, this.constructor);
  }
}

// Function to send detailed error response in development environment
const sendDevError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack, // Sending error stack trace in response
  });
};

// Function to send simplified error response in production environment
const sendProdError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// Function to format different types of errors consistently
const formatErrors = (err) => {
  // Check if error is already formatted
  if (err.isOperational) return err;

  // Handling different types of errors and formatting them accordingly
  if (err.isAjvError) {
    return new ErrorHandler(`insufficient data provided: ${err.errors}`, 400);
  } else if (err.name === "CastError") {
    return new ErrorHandler(`Invalid ${err.path}: ${err.value}`, 400);
  } else if (err.name === "JsonWebTokenError") {
    return new ErrorHandler("JWT missing!", 400);
  } else if (err.name === "ValidationError") {
    return new ErrorHandler(err.message, 400);
  } else if (err.code === 11000) {
    // Handling MongoDB duplicate key error
    const field = Object.keys(err.keyPattern)[0];
    const message = `${field} with ${err.keyValue[field]} already exists in the database`;
    return new ErrorHandler(message, 400);
  } else {
    // Handling unknown errors
    console.error(`Unknown error occurred: ${err}`);
    return new ErrorHandler("Internal server error occurred!", 500);
  }
};

// Middleware function to handle errors globally
const errorMiddleware = (error, req, res, next) => {
  // Format the error
  const err = error instanceof ErrorHandler ? error : formatErrors(error);
  // Determine whether to send detailed error response based on environment
  if (config.NODE_ENV === "dev") {
    sendDevError(err, res);
  } else {
    sendProdError(err, res);
  }
};

// Exporting error handling utilities
module.exports = {
  ErrorHandler,
  errorMiddleware,
};
