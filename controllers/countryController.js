// Importing the required entity module for country operations
const countryEntity = require("../entities/countryEntity");

// Controller function to create a new country
exports.createCountry = async (req, res) => {
  try {
    // Extracting country logo URL and new country data from request object
    const countryLogo = req.downloadURL;
    const newCountry = req.body;

    // Checking if the country already exists in the database
    const existingCountry = await countryEntity.findByPk(newCountry.COUNTRY);

    // If country already exists, return error message
    if (existingCountry) {
      return res.status(400).json({ message: "Country already exists" });
    }

    // Creating the new country entity in the database
    const createdCountry = await countryEntity.create({
      countryLogo,
      FC: newCountry.FC,
      COUNTRY: newCountry.COUNTRY,
    });

    // Sending the newly created country data in response
    res.json(createdCountry);
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("error creating country", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to get all countries
exports.getAllCountries = async (req, res) => {
  try {
    // Retrieving all countries from the database with selected attributes
    const allCountries = await countryEntity.findAll({
      attributes: [
        ["countryId", "countryId"],
        ["FC", "FC"],
        ["COUNTRY", "country"],
        ["countryLogo", "logo"],
      ],
    });

    // Sending the retrieved countries data in response
    res.json(allCountries);
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("error getting all countries", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
