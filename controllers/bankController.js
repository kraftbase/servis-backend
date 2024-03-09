const validator = require("express-validator");
const bankEntity = require("../entities/bankEntity");

exports.createBank = async (req, res) => {
  // const validantionErrors = validator.validationResult(req);
  // if (!validantionErrors.isEmpty()) {
  //   console.log(validantionErrors);
  //   return res.status(400).json({ message: validantionErrors.array() });
  // }
  try {
    const bankLogo = req.downloadURL;
    const newBank = req.body;

    const exsistingBank = await bankEntity.findByPk(newBank.bankCode);

    if (exsistingBank) {
      return res.status(400).json({ message: "Bank already exsist" });
    }

    const createdBank = await bankEntity.create({
      bankLogo,
      bankCode: newBank.bankCode,
      bankName: newBank.bankName,
    });

    res.status(201).json(createdBank);
  } catch (error) {
    console.log("error creating bank", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAllBanks = async (req, res) => {
  try {
    const allBanks = await bankEntity.findAll({
      attributes: [
        ["bankId", "bankId"],
        ["bankCode", "bankCode"],
        ["bankName", "name"],
        ["bankLogo", "logo"],
      ],
    });
    res.json(allBanks);
  } catch (error) {
    console.log("error getting all bank", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
