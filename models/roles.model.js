const mongoose = require("mongoose");

const RolesSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
        },
        role: {
            type: String,
            required: true
        },
        permission_ids: {
            type: Array,
            required: true
        },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date },
    }
)

const collectionName = 'roles'

module.exports = mongoose.model('Roles', RolesSchema, collectionName)