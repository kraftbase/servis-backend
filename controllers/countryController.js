const countryEntity = require("../entities/countryEntity");

exports.createCountry = async (req, res) => {
  try {
    const countryLogo = req.downloadURL;
    const newCountry = req.body;

    const exsistingCountry = await countryEntity.findByPk(newCountry.COUNTRY);

    if (exsistingCountry) {
      return res.status(400).json({ message: "Country already exsist" });
    }

    const createdCountry = await countryEntity.create({
      countryLogo,
      FC: newCountry.FC,
      COUNTRY: newCountry.COUNTRY,
    });

    res.json(createdCountry);
  } catch (error) {
    console.log("error creating country", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAllCountries = async (req, res) => {
  try {
    const allCountry = await countryEntity.findAll({
      attributes: [
        ["countryId", "countryId"],
        ["FC", "FC"],
        ["COUNTRY", "country"],
        ["countryLogo", "logo"],
      ],
    });
    res.json(allCountry);
  } catch (error) {
    console.log("error getting all country", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
