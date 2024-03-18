// Importing Express Validator for input validation
const validator = require("express-validator");

// Importing the required entity module for FC operations
const FCEntity = require("../entities/FCEntity");

// Importing Sequelize operators
const { Op } = require("sequelize");

// Controller function to create a new FC
exports.createFC = async (req, res) => {
  // Perform input validation
  const validationErrors = validator.validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return res.status(400).json({ message: validationErrors.array() });
  }

  try {
    // Extracting new FC data from request body
    const newFc = req.body;

    // Check if the FC already exists in the database
    const existingFc = await FCEntity.findByPk(newFc.FC);
    if (existingFc) {
      return res.status(400).json({ message: "FC already exists" });
    }

    // Creating the new FC entity in the database
    const createdFc = await FCEntity.create(newFc);
    res.json(createdFc);
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("Error in creating FC", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to get all FCs
exports.getAllFc = async (req, res) => {
  try {
    // Extracting search query from request parameters
    const search = req.query.search ? req.query.search : "";

    // Finding FCs in the database based on search query
    const foundFc = await FCEntity.findAll({
      where: {
        FC: { [Op.like]: `%${search.toUpperCase()}%` },
      },
    });
    res.json(foundFc);
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("Error in finding FC", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
