const bcrypt = require('bcrypt')
const config = require('../utils/config')

exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)

    return encryptedPassword
}

exports.comparePassword = async (providedPassword, savedPassword) => {
    return await bcrypt.compare(providedPassword, savedPassword)
}