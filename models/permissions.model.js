const mongoose = require("mongoose");

const PermissionsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    }
)

const collectionName = 'permissions'

module.exports = mongoose.model('Permissions', PermissionsSchema, collectionName)