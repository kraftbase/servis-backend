// Importing utility modules and entities for PI operations
const { Op } = require("sequelize");
const PIEntity = require("../entities/piEntity");
const countryEntity = require("../entities/countryEntity");
const bankEntity = require("../entities/bankEntity");

// Controller function to generate a new PI
exports.generatePI = async (req, res) => {
  try {
    // Extracting new PI data from request body
    const newPI = req.body;
    const document = req.downloadURL || "";

    // Validating required fields
    if (
      !newPI.PI_NUMBER ||
      !newPI.PI_VALUE ||
      !newPI.SUPPLIER_NAME ||
      !newPI.MATERIAL_CATAGORY ||
      !newPI.FC ||
      !newPI.country
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields for PI generation" });
    }

    // Check if PI with the given number already exists
    const existingPi = await PIEntity.findByPk(newPI.PI_NUMBER);
    if (existingPi) {
      return res
        .status(400)
        .json({ message: "PI with this number already exists" });
    }

    // Creating the new PI entity in the database
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
    // Handling errors and sending appropriate error response
    console.log("Error in creating PI", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to delete a PI by ID
exports.deletePIById = async (req, res) => {
  try {
    const piId = req.params.id;
    // Deleting PI from the database based on the given ID
    const rowsAffected = await PIEntity.destroy({
      where: { PI_NUMBER: piId },
    });
    if (rowsAffected > 0) {
      return res.status(200).json({ message: "PI deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "No PI found for this PI number" });
    }
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("Error in deleting PI by ID", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to update a PI by ID
exports.updatePIById = async (req, res) => {
  try {
    // Extracting data from the request
    const document = req.downloadURL;
    const piId = req.params.id;
    const newData = req.body;

    // Checking if the PI with the given ID exists
    const existingPi = await PIEntity.findByPk(piId);
    if (!existingPi) {
      return res.status(404).json({ message: "No PI found" });
    }

    // Updating the PI in the database
    const updatedPi = await PIEntity.update(newData, {
      where: { PI_NUMBER: piId },
    });
    res.json({ message: "PI updated successfully" });
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("Error in updating PI by ID", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to get all PIs with filters and pagination
exports.getAllPIs = async (req, res) => {
  try {
    // Extracting filter parameters from the request query
    const {
      search,
      priceFrom,
      priceTo,
      fc,
      bankCode,
      country,
      startDate,
      endDate,
      sliderDate,
      page,
      pageSize,
    } = req.query;

    // Constructing the where condition based on filter parameters
    let whereCondition = {};

    // Filtering by search keyword if provided
    if (search) {
      whereCondition[Op.or] = [
        { PI_NUMBER: { [Op.like]: `%${search}%` } },
        { MATERIAL_CATAGORY: { [Op.like]: `%${search}%` } },
        { SUPPLIER_NAME: { [Op.like]: `%${search}%` } },
      ];
    }

    // Filtering by price range if provided
    if (priceFrom > 0 || priceTo < Number.MAX_SAFE_INTEGER) {
      whereCondition.PI_VALUE = {
        [Op.between]: [priceFrom || 0, priceTo || Number.MAX_SAFE_INTEGER],
      };
    }

    // Filtering by FC if provided
    if (fc) {
      whereCondition.FC = { [Op.eq]: fc };
    }

    // Filtering by start and end dates if provided
    if (startDate && endDate) {
      whereCondition.PI_DATE = { [Op.between]: [startDate, endDate] };
    }

    // Filtering by bank code if provided
    if (bankCode) {
      whereCondition.bankDetails = { [Op.eq]: bankCode };
    }

    // Filtering by country if provided
    if (country) {
      whereCondition.country = { [Op.eq]: country };
    }

    // Filtering by slider date if provided
    if (sliderDate) {
      whereCondition.sliderDate = { [Op.lte]: sliderDate };
    }

    // Pagination parameters
    const pageNumber = page || 1;
    const limit = pageSize || 10;
    const offset = (pageNumber - 1) * limit;

    // Finding PIs in the database based on the constructed where condition
    const allPi = await PIEntity.findAll({
      where: whereCondition,
      limit: limit,
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

    // Mapping each PI to add a status field based on certain conditions
    const piWithStatus = allPi.map((pi) => {
      let status = "Stage 10";
      // Define your status conditions here
      // Example:
      // if (!pi.bankDetails) {
      //   status = "Stage 1";
      // }
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

    // Counting total number of PIs for pagination
    const totalCount = await PIEntity.findAndCountAll();
    const totalPages = Math.ceil(totalCount.count / limit);

    // Sending response with PIs data and pagination info
    res.json({ data: piWithStatus, pages: totalPages });
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("Error in finding PIs", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to get counts of PIs based on various parameters
exports.getPiCounts = async (req, res) => {
  try {
    // Extracting filter parameters from the request query
    const { startDate, endDate, sliderDate } = req.query;

    // Constructing where condition based on filter parameters
    const dateFilter =
      startDate && endDate
        ? { PI_DATE: { [Op.between]: [startDate, endDate] } }
        : {};
    const sliderDateFilter = sliderDate
      ? { PI_DATE: { [Op.lte]: sliderDate } }
      : "";

    // Counting total PIs and PIs with priority/non-priority based on filters
    const allPiCount = await PIEntity.findAndCountAll({
      where: { ...sliderDateFilter, ...dateFilter },
    });
    const piPriorityCount = await PIEntity.findAndCountAll({
      where: { isPriority: true, ...sliderDateFilter, ...dateFilter },
    });
    const piNonPriorityCount = await PIEntity.findAndCountAll({
      where: { isPriority: false, ...sliderDateFilter, ...dateFilter },
    });

    // Sending response with counts data
    res.json({
      data: {
        priorityCount: piPriorityCount.count,
        countAll: allPiCount.count,
        normalCount: piNonPriorityCount.count,
      },
    });
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("Error in getting PI counts", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to get a PI by ID
exports.getPIById = async (req, res) => {
  try {
    // Extracting PI ID from request parameters
    const piId = req.params.id;

    // Finding PI in the database based on ID
    const foundPi = await PIEntity.findByPk(piId);
    if (!foundPi || foundPi.length === 0) {
      return res.status(404).json({ message: "No PI found for the given ID" });
    }

    // Sending response with found PI data
    res.json(foundPi);
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("Error in finding PI by ID", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
