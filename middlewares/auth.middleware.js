const { header, body, validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
const jwt = require('jsonwebtoken');
const { now } = require('../helpers/datehelpers');

exports.authMiddlware = [
    header('authorization', 'Authorization is required').notEmpty().trim(),
    async (req, res, next) => {
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        formData = {
            "authorization": req.headers.authorization || ('Bearer ' + req.body.access_token),
        };

        const access_token = formData.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

            var access_token_row_db = []
            var user_data_db = []
            if (decoded) {

                access_token_row_db =  await AccessTokens.find({
                    token: access_token,
                    user_id: decoded._id,
                    status: 'active',
                    expires_at: { $gt: now }
                }) || []
                access_token_row_db = await json_process(access_token_row_db)

                user_data_db = await Users.findOne({ _id: decoded._id, status: 'active' }) || {}
                user_data_db = await json_process(user_data_db)

                prev_access_tokens_expiring = await AccessTokens.updateMany(
                                                    {
                                                        expires_at: { $lte: now }
                                                    },
                                                    {
                                                        $set: {
                                                            user_id: decoded._id,
                                                            status: 'inactive',
                                                        }
                                                    }
                                                )
       
            }

            if (decoded.id && access_token_row_db.length && user_data_db.length) {
                next()
            } else {
                return set_response(res, null, 401, 'failed', ['Unauthenticated'])
            }
        } catch (error) {
            return set_response(res, null, 401, 'failed', [error.message])
        }

    },
];