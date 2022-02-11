const mongoose = require("mongoose");

const PermissionsSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
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
        deleted_at: { type: Date },
        created_by: { type: Object},
        updated_by: { type: Object},
        deleted_by: { type: Object},
    }
)

const collectionName = 'permissions'

module.exports = mongoose.model('Permissions', PermissionsSchema, collectionName)