const mongoose = require("mongoose");

const RolesSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    }
)

const collectionName = 'roles'

module.exports = mongoose.model('Roles', RolesSchema, collectionName)