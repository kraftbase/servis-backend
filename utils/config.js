const dotenv = require('dotenv')

const envFound = dotenv.config()

if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

const config = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'D6FnhgHSJADAKSDHAdsSsJDf23vds',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '4d',
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PI_SCHEMA: 'PI',
    USER_SCHEMA: 'USER'
}

module.exports = config