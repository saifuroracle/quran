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
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date },
    }
)

const collectionName = 'permissions'

module.exports = mongoose.model('Permissions', PermissionsSchema, collectionName)