// Importing necessary modules and entity for supplier operations
const validator = require("express-validator");
const { Op } = require("sequelize");
const supplierEntity = require("../entities/supplierEntity");

// Controller function to create a new supplier
exports.createSupplier = async (req, res) => {
  // Perform input validation
  const validationErrors = validator.validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return res.status(400).json({ message: validationErrors.array() });
  }
  try {
    // Extract new supplier data from the request
    const newSupplier = req.body;

    // Check if the supplier already exists in the database
    const existingSupplier = await supplierEntity.findByPk(
      newSupplier.SUPPLIER
    );
    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier already exists" });
    }

    // Create the new supplier entity in the database
    const createdSupplier = await supplierEntity.create(newSupplier);
    res.json(createdSupplier);
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error in creating Supplier", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to get all suppliers
exports.getAllSupplier = async (req, res) => {
  try {
    // Extract search query from request parameters
    const search = req.query.search ? req.query.search : "";

    // Find suppliers in the database based on search query
    const foundSupplier = await supplierEntity.findAll({
      where: {
        SUPPLIER: { [Op.like]: `%${search}%` },
      },
    });
    res.json(foundSupplier);
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error in finding Supplier", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
