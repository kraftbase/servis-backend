const validator = require("express-validator");
const { Opp, Op } = require("sequelize");
const suplierEntity = require("../entities/supplierEntity");

exports.createSupplier = async (req, res) => {
  const validantionErrors = validator.validationResult(req);
  if (!validantionErrors.isEmpty()) {
    console.log(validantionErrors);
    return res.status(400).json({ message: validantionErrors.array() });
  }
  try {
    const newSupplier = req.body;
    const exsistingSupplier = await suplierEntity.findByPk(newSupplier.SUPPLIER);
    if (exsistingSupplier) {
      return res.status(400).json({ message: "Supplier already exsist" });
    }
    const createdSupplier = await suplierEntity.create(newSupplier);
    res.json(createdSupplier);
  } catch (error) {
    console.log("Error in creating Supplier", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAllSupplier = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search : "";
    const foundSupplier = await suplierEntity.findAll({
      where: {
        SUPPLIER: { [Op.like]: `%${search}%` },
      },
    });
    res.json(foundSupplier);
  } catch (error) {
    console.log("Error in finding Supplier", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


