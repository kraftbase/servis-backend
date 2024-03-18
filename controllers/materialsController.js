// Importing Express Validator for input validation
const validator = require("express-validator");

// Importing Sequelize operators
const { Op } = require("sequelize");

// Importing the required entity module for materials operations
const materialEntity = require("../entities/materialsEntity");

// Controller function to create new materials
exports.createMaterials = async (req, res) => {
  // Perform input validation
  const validationErrors = validator.validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return res.status(400).json({ message: validationErrors.array() });
  }

  try {
    // Extracting new materials data from request body
    const newMaterials = req.body;

    // Check if the materials already exist in the database
    const existingMaterials = await materialEntity.findByPk(
      newMaterials.MATERIAL_CATAGORY
    );
    if (existingMaterials) {
      return res.status(400).json({ message: "Materials already exist" });
    }

    // Creating the new materials entity in the database
    const createdMaterials = await materialEntity.create(newMaterials);
    res.json(createdMaterials);
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("Error in creating Materials", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to get all materials
exports.getAllMaterials = async (req, res) => {
  try {
    // Extracting search query from request parameters
    const search = req.query.search ? req.query.search : "";

    // Finding materials in the database based on search query
    const foundMaterials = await materialEntity.findAll({
      where: {
        MATERIAL_CATAGORY: { [Op.like]: `%${search}%` },
      },
    });
    res.json(foundMaterials);
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("Error in finding Materials", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
