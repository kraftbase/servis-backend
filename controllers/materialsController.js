const validator = require("express-validator");
const { Opp, Op } = require("sequelize");
const materialEntity = require("../entities/materialsEntity");

exports.createMaterials = async (req, res) => {
  const validantionErrors = validator.validationResult(req);
  if (!validantionErrors.isEmpty()) {
    console.log(validantionErrors);
    return res.status(400).json({ message: validantionErrors.array() });
  }
  try {
    const newMaterials = req.body;
    const exsistingMaterials = await materialEntity.findByPk(newMaterials.MATERIAL_CATAGORY);
    if (exsistingMaterials) {
      return res.status(400).json({ message: "Materials already exsist" });
    }
    const createdMaterials = await materialEntity.create(newMaterials);
    res.json(createdMaterials);
  } catch (error) {
    console.log("Error in creating Materials", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAllMaterials = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search : "";
    const foundMaterials = await materialEntity.findAll({
      where: {
        MATERIAL_CATAGORY: { [Op.like]: `%${search}%` },
      },
    });
    res.json(foundMaterials);
  } catch (error) {
    console.log("Error in finding Materials", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

