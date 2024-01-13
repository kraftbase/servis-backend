const schemaManager = require("../utils/schemaValidator");
const config = require("../utils/config");

const userSchema = {
    type: 'object',
    properties: {

    },
    required: [],
    additionalProperties: false
}

schemaManager.addSchema(config.USER_SCHEMA, userSchema)

exports.createUser = async (req, res, next) => {

}

exports.deleteUserById = async (req, res, next) => {

}

exports.updateUserById = async (req, res, next) => {

}

exports.getUserById = async (req, res, next) => {

}

exports.getAllUsers = async (req, res, next) => {

}