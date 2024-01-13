const schemaManager = require('../utils/schemaValidator')
const config = require('../utils/config')

const PISchema = {
    type: 'object',
    properties: {
        number: { type: 'string' },
        materialCategory: { type: 'string' },
        supplierName: { type: 'string' },
        currency: {type: 'string'},
        value: {type: 'number'},
        isPriority: {type: 'boolean'}
    },
    required: ['number', 'materialCategory', 'supplierName', 'currency', 'value', 'isPriority'],
    additionalProperties: false
}

schemaManager.addSchema(config.PI_SCHEMA, PISchema)


exports.generatePI = async (req, res, next) => {
    schemaManager.validateSchema(config.PI_SCHEMA, req.body)

}

exports.deletePIById = async (req, res, next) => {

}

exports.updatePIById = async (req, res, next) => {

}

exports.getAllPIs = async (req, res, next) => {

}

exports.getPIById = async (req, res, next) => {

}