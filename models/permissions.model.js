const mongoose = require("mongoose");

const PermissionsSchema = mongoose.Schema(
    {
        permission: {
            type: String,
            required: true
        },
        module_id: {
            type: Number,
            required: true
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
    }
)

const collectionName = 'permissions'

module.exports = mongoose.model('Permissions', PermissionsSchema, collectionName)