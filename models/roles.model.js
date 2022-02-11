const mongoose = require("mongoose");

const RolesSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
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
        deleted_at: { type: Date },
        created_by: { type: Object},
        updated_by: { type: Object},
        deleted_by: { type: Object},
    }
)

const collectionName = 'roles'

module.exports = mongoose.model('Roles', RolesSchema, collectionName)