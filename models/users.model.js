const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
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
        role_ids: {
            type: Array,
            required: true
        },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date },
        created_by: { type: String, required: false },
    }
)

const collectionName = 'users'

module.exports = mongoose.model('Users', UsersSchema, collectionName)