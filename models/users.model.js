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
            type: String,
            required: true,
            default: 'active',
            enum : ['active','inactive'],
        },
    }
)

const collectionName = 'users'

module.exports = mongoose.model('Users', UsersSchema, collectionName)