const validator = require("express-validator");
const FCEntity = require("../entities/FCEntity");
const { Opp, Op } = require("sequelize");

exports.createFC = async (req, res) => {
  const validantionErrors = validator.validationResult(req);
  if (!validantionErrors.isEmpty()) {
    console.log(validantionErrors);
    return res.status(400).json({ message: validantionErrors.array() });
  }
  try {
    const newFc = req.body;
    const exsistingFc = await FCEntity.findByPk(newFc.FC);
    if (exsistingFc) {
      return res.status(400).json({ message: "FC already exsist" });
    }
    const createdFc = await FCEntity.create(newFc);
    res.json(createdFc);
  } catch (error) {
    console.log("Error in creating fc", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAllFc = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search : "";
    const foundFc = await FCEntity.findAll({
      where: {
        FC: { [Op.like]: `%${search.toUpperCase()}%` },
      },
    });
    res.json(foundFc);
  } catch (error) {
    console.log("Error in finding fc", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};