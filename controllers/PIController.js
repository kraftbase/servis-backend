const schemaManager = require("../utils/schemaValidator");
const config = require("../utils/config");
const validator = require("express-validator");
const { Op } = require("sequelize");

const PIEntity = require("../entities/piEntity");
const FCEntity = require("../entities/FCEntity");
const materialEntity = require("../entities/materialsEntity");
const suplierEntity = require("../entities/supplierEntity");
const sequelize = require("../db");
const countryEntity = require("../entities/countryEntity");
const bankEntity = require("../entities/bankEntity");

exports.generatePI = async (req, res) => {
  try {
    const newPI = req.body;
    const document = req.downloadURL || "";

    if (!newPI.PI_NUMBER) {
      return res.status(400).json({ message: "Pi Number is missing!" });
    }
    if (!newPI.PI_VALUE) {
      return res.status(400).json({ message: "Pi Value is missing!" });
    }
    if (!newPI.SUPPLIER_NAME) {
      return res.status(400).json({ message: "Supplier name is missing!" });
    }
    if (!newPI.MATERIAL_CATAGORY) {
      return res.status(400).json({ message: "Material Catagory is missing!" });
    }
    if (!newPI.FC) {
      return res.status(400).json({ message: "FC is missing!" });
    }
    if (!newPI.country) {
      return res.status(400).json({ message: "country is missing!" });
    }

    const exsistingPi = await PIEntity.findByPk(newPI.PI_NUMBER);

    if (exsistingPi) {
      return res
        .status(400)
        .json({ message: "Pi with this number already exsist" });
    }
    const createdPi = await PIEntity.create({
      PI_NUMBER: newPI.PI_NUMBER,
      PI_VALUE: newPI.PI_VALUE,
      bankDetails: newPI.bankDetails,
      SUPPLIER_NAME: newPI.SUPPLIER_NAME,
      MATERIAL_CATAGORY: newPI.MATERIAL_CATAGORY,
      FC: newPI.FC,
      country: newPI.country,
      documents: document,
      isPriority: newPI.isPriority,
    });

    res.status(201).json(createdPi);
  } catch (error) {
    console.log("Error in creating pi", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.deletePIById = async (req, res) => {
  try {
    const piId = req.params.id;
    const rowsAffected = await PIEntity.destroy({
      where: { PI_NUMBER: piId },
    });
    if (rowsAffected > 0) {
      return res.status(200).json({ message: "Pi deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "No pi found for this pi number" });
    }
  } catch (error) {
    console.log("error in delete pi controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updatePIById = async (req, res) => {
  try {
    const document = req.downloadURL;
    const piId = req.params.id;
    const newData = req.body;
    console.log("new data recieved is: ", req.body);
    console.log("new piid recieved is: ", piId);
    const exsistingPi = await PIEntity.findByPk(piId);
    if (!exsistingPi) {
      return res.status(404).json({ message: "No pi found" });
    }
    const updatedPi = await PIEntity.update(newData, {
      where: { PI_NUMBER: piId },
    });
    res.json({ message: "Pi updated successfully" });
  } catch (error) {
    console.log("error in update pi controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAllPIs = async (req, res) => {
  try {
    const search = req.query.search || "";
    const priceFrom = parseFloat(req.query.priceFrom) || 0;
    const priceTo = parseFloat(req.query.priceTo) || Number.MAX_SAFE_INTEGER;
    const fc = req.query.fc || "";
    const bankCode = req.query.bankCode || "";
    const country = req.query.country || "";
    const startDate = req.query.startDate || "";
    const endDate = req.query.endDate || "";
    const sliderDate = req.query.sliderDate || "";

    let whereCondition = {};

    if (search) {
      whereCondition[Op.or] = [
        { PI_NUMBER: { [Op.like]: `%${search}%` } },
        { MATERIAL_CATAGORY: { [Op.like]: `%${search}%` } },
        { SUPPLIER_NAME: { [Op.like]: `%${search}%` } },
      ];
    }
    if (priceFrom > 0 || priceTo < Number.MAX_SAFE_INTEGER) {
      whereCondition.PI_VALUE = {
        [Op.between]: [priceFrom || 0, priceTo || Number.MAX_SAFE_INTEGER],
      };
    }

    if (fc) {
      whereCondition.FC = { [Op.eq]: fc };
    }

    if (startDate && endDate) {
      whereCondition.PI_DATE = { [Op.between]: [startDate, endDate] };
    }

    // Only include BANK_NAME condition if it is provided
    if (bankCode) {
      whereCondition.bankDetails = { [Op.eq]: bankCode };
    }

    if (sliderDate) {
      console.log("slider date is: ", sliderDate);
      whereCondition.sliderDate = { [Op.lte]: sliderDate };
    }

    if (country) {
      whereCondition.country = { [Op.eq]: country };
    }

    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const offset = (page - 1) * pageSize;

    const allPi = await PIEntity.findAll({
      where: whereCondition,
      limit: pageSize,
      include: [{ model: countryEntity }, { model: bankEntity }],
      offset: offset,
      attributes: [
        ["PI_VALUE", "value"],
        ["isPriority", "priority"],
        ["country", "country"],
        ["SUPPLIER_NAME", "supplier"],
        ["MATERIAL_CATAGORY", "material"],
        ["FC", "currency"],
        ["PI_DATE", "date"],
        ["PI_NUMBER", "piNumber"],
        ["bankDetails", "bankDetails"],
        ["country", "COUNTRY"],
        ["documents", "document"],
        ["updatedAt", "updatedAt"],
      ],
      order: [["updatedAt", "DESC"]],
    });

    const piWithStatus = allPi.map((pi) => {
      let status = "Stage 10";
      switch (true) {
        case !pi.bankDetails:
          status = "Stage 1";
          break;
        case !pi.dataValues.document:
          status = "Stage 2";
          break;
        case 3:
          status = "Stage 3";
          break;
        case 4:
          status = "Stage 4";
          break;
        case 5:
          status = "Stage 5";
          break;
        case 6:
          status = "Stage 6";
          break;
        case 7:
          status = "Stage 7";
          break;
        case 8:
          status = "Stage 8";
          break;
        case 9:
          status = "Stage 9";
          break;
        default:
          break;
      }

      return { ...pi.toJSON(), status };
    });

    const totalCount = await PIEntity.findAndCountAll();
    const totalPages = Math.ceil(totalCount.count / pageSize);

    res.json({ data: piWithStatus, pages: totalPages });
  } catch (error) {
    console.log("Error in find pi controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getPiCounts = async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const sliderDate = req.query.sliderDate;
    console.log("req query is: ", req.query);
    console.log(sliderDate);

    const dateFilter =
      startDate && endDate
        ? {
            PI_DATE: { [Op.between]: [startDate, endDate] },
          }
        : {};

    const sliderDateFilter = sliderDate
      ? { PI_DATE: { [Op.lte]: sliderDate } }
      : "";

    const allPiCount = await PIEntity.findAndCountAll({
      where: {
        ...sliderDateFilter,
        ...dateFilter,
      },
    });

    const piPriorityCount = await PIEntity.findAndCountAll({
      where: {
        isPriority: true,
        ...sliderDateFilter,
        ...dateFilter, // Include date filter if present
      },
    });

    const piNonPriorityCount = await PIEntity.findAndCountAll({
      where: {
        isPriority: false,
        ...sliderDateFilter,
        ...dateFilter, // Include date filter if present
      },
    });

    res.json({
      data: {
        priorityCount: piPriorityCount.count,
        countAll: allPiCount.count,
        normalCount: piNonPriorityCount.count,
      },
    });
  } catch (error) {
    console.log("error in count pi controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getPIById = async (req, res) => {
  try {
    const piId = req.params.id;
    const foundPi = await PIEntity.findByPk(piId);
    if (!foundPi || foundPi.length === 0) {
      return res.status(404).json({ message: "No pi found for the id" });
    }
    res.json(foundPi);
  } catch (error) {
    console.log("error in find  pi by id controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
