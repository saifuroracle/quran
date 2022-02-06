const mongoose = require("mongoose");

const AccessTokensSchema = mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'active',
            enum : ['active','inactive'],
        },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date },
        expires_at: { type: Date },
    }
)

const collectionName = 'access_tokens'

module.exports = mongoose.model('AccessTokens', AccessTokensSchema, collectionName)