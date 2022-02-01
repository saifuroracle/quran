const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true
        },
    }
)

const collectionName = 'users'

module.exports = mongoose.model('Users', UsersSchema, collectionName)