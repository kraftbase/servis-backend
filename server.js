const config = require("./utils/config");
const cookieParser = require("cookie-parser");
const oracledb = require("oracledb");
const express = require("express");
const router = require("./routes/index");
const { errorMiddleware, ErrorHandler } = require("./controllers/errorHandler");
const sequelize = require("./db");

const app = express();

// Function to connect to the database
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};

// Call the connectDatabase function
connectDatabase();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Routes
app.use("/api/v1", router);

// Error handler for non-existing routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler("Requested route does not exist", 404));
});

// Global error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running successfully at PORT ${config.PORT}`);
});
