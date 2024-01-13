// const connectMongoDB = require('./mongoDB')
const config = require('../utils/config')

const initiateConnectors = async () => {
    try {
        // await connectOracleDB(parameters)

    } catch (err) {
        console.log(`Error occurred while initiate connection to DB :: ${err}`)
        process.exit(1)
    }
}

module.exports = initiateConnectors
