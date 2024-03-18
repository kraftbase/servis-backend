// Importing the bankEntity module which presumably interacts with the database
const bankEntity = require("../entities/bankEntity");

// Controller function to create a new bank
exports.createBank = async (req, res) => {
  try {
    // Extracting the bank logo URL from the request object
    const bankLogo = req.downloadURL;
    // Extracting the new bank details from the request body
    const newBank = req.body;

    // Checking if a bank with the same bank code already exists
    const existingBank = await bankEntity.findByPk(newBank.bankCode);

    // If a bank with the same bank code exists, return a 400 response with an error message
    if (existingBank) {
      return res.status(400).json({ message: "Bank already exists" });
    }

    // Creating a new bank entity in the database
    const createdBank = await bankEntity.create({
      bankLogo,
      bankCode: newBank.bankCode,
      bankName: newBank.bankName,
    });

    // Returning a 201 status code with the created bank details
    res.status(201).json(createdBank);
  } catch (error) {
    // Logging and returning a 500 status code in case of an error during bank creation
    console.log("Error creating bank", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to retrieve all banks
exports.getAllBanks = async (req, res) => {
  try {
    // Retrieving all banks from the database with specific attributes
    const allBanks = await bankEntity.findAll({
      attributes: [
        ["bankId", "bankId"],
        ["bankCode", "bankCode"],
        ["bankName", "name"],
        ["bankLogo", "logo"],
      ],
    });

    // Returning all banks retrieved from the database
    res.json(allBanks);
  } catch (error) {
    // Logging and returning a 500 status code in case of an error while retrieving banks
    console.log("Error getting all banks", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
