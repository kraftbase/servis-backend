const Ajv = require('ajv')

const ajv = new Ajv()

const compiledSchemas = {}

exports.addSchema = (schemaName, schema) => {
    compiledSchemas[schemaName] = ajv.compile(schema)
}

exports.validateSchema = (schemaName, jsonData) => {
    const validate = compiledSchemas[schemaName]
    const isValid = validate(jsonData)
    if (!isValid) {
        const validationErrors = validate.errors.map(error => error.message)
        const customError = new Error('AJV validation Error')
        customError.errors = validationErrors
        customError.isAjvError = true
        throw customError
    }
}
