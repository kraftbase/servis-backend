const schemaManager = require("../utils/schemaValidator");
const config = require("../utils/config");
const validator = require("express-validator");
const { Op } = require("sequelize");

const PIEntity = require("../entities/piEntity");
const FCEntity = require("../entities/FCEntity");
const materialEntity = require("../entities/materialsEntity");
const suplierEntity = require("../entities/supplierEntity");
const sequelize = require("../db");

exports.generatePI = async (req, res) => {
  const validantionErrors = validator.validationResult(req);
  if (!validantionErrors.isEmpty()) {
    console.log(validantionErrors);
    return res.status(400).json({ message: validantionErrors.array() });
  }
  try {
    const newPI = req.body;
    const exsistingPi = await PIEntity.findByPk(newPI.PI_NUMBER)

    if(exsistingPi){
       return res.status(400).json({message:'Pi with this number already exsist'})
    }
    const fc = await FCEntity.findByPk(newPI.FC);
    const material = await materialEntity.findByPk(newPI.MATERIAL_CATAGORY);
    const supplier = await suplierEntity.findByPk(newPI.SUPPLIER_NAME);
    const createdPi = await PIEntity.create({
      PI_NUMBER: newPI.PI_NUMBER,
      PI_VALUE: newPI.PI_VALUE,
      Bank_Name: newPI.Bank_Name,
      SUPPLIER_NAME:supplier.SUPPLIER,
      MATERIAL_CATAGORY:material.MATERIAL_CATAGORY,
      FC:fc.FC
    })
      

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
    res.status(500).json({ message: "Somethung went wrong" });
  }
};

exports.updatePIById = async (req, res) => {
  try {
    const piId = req.params.id;
    const newData = req.body;
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
    res.status(500).json({ message: "Somethung went wrong" });
  }
};

exports.getAllPIs = async (req, res) => {
  try {
    const search = req.query.search || "";
    const priceFrom = parseFloat(req.query.priceFrom) || 0;
    const priceTo = parseFloat(req.query.priceTo) || Number.MAX_SAFE_INTEGER;
    const fc = req.query.fc || "";
    const date = req.query.date || "";
    const bankName = req.query.bankName || "";

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
    if (date) {
      whereCondition.PI_DATE = { [Op.eq]: date };
    }

    // Only include BANK_NAME condition if it is provided
    if (bankName) {
      whereCondition.Bank_Name = { [Op.like]: `%${bankName}%` };
    }

    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 10
    const offset = (page-1)*pageSize

    const allPi = await PIEntity.findAll({
      where: whereCondition,
      limit:pageSize,
      offset:offset,
      attributes:[
        ['PI_VALUE','value'],
        ['status','status'],
        ['isPriority','priority'],
        ['country','country'],
        ['SUPPLIER_NAME','supplier'],
        ['MATERIAL_CATAGORY','material'],
        ['FC','currency'],
        ['PI_DATE','date'],
        ['PI_NUMBER','piNumber'],
        ['Bank_Name','bankName']
      ]
    });

    const totalCount = await PIEntity.findAndCountAll()
    const totalPages = Math.ceil(totalCount.count/pageSize)

    res.json({data:allPi,pages:totalPages});
  } catch (error) {
    console.log("Error in find pi controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getPiCounts = async(req,res)=>{
  try {
    console.log('counting all pis');
    const allPiCount = await PIEntity.findAndCountAll();
    console.log('counting pending pis');
    const piPendingCount = await PIEntity.findAndCountAll({
      where:{
        status:'pending'
      }
    })
    console.log('counting pending priority pis');
    const piPriorityPendingCount = await PIEntity.findAndCountAll({
      where:{
        status:'pending',
        isPriority:true
      }
    })
    console.log('counting approved pis');
    const piAprrovedCount = await PIEntity.findAndCountAll({
      where:{
        status:'approved'
      }
    })
    res.json({data:{
      approvedCount:piAprrovedCount.count,
      pendingCount:piPendingCount.count,
      priorityPendingCount:piPriorityPendingCount.count,
      countAll:allPiCount.count
    }})
  } catch (error) {
    console.log("error in count  pi controller: ", error);
    res.status(500).json({ message: "Somethung went wrong" });
  }
}

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
    res.status(500).json({ message: "Somethung went wrong" });
  }
};
