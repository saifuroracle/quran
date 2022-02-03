const Users = require("../models/users.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
const { mongoResult } = require('../helpers/mongohelpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.login = async (req, res) => {
    let formData = {...req.query, ...req.body}

    const existingUserData = await mongoResult(Users.findOne({ email: formData?.email }))
    if (!existingUserData) {
        return set_response(res, null, 422, 'failed', ['Invalid email!'])
    }

    if (existingUserData.status!='active') {
        return set_response(res, null, 422, 'failed', [`User is ${existingUserData.status || 'inactive'}!`])
    }

    plain_password = formData.password
    hash = existingUserData.password
    password_validity = await bcrypt.compare(plain_password, hash)

    if (!password_validity) {
        return set_response(res, null, 422, 'failed', [`Invalid password!`])
    }

    delete existingUserData.password

    var token = jwt.sign({...existingUserData }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_EXPIRES_IN) });

    expires_at = moment().add(process.env.JWT_EXPIRES_IN, 'seconds').format('yy-MM-DD HH:mm:ss')


    var userrolespermissions = await mongoResult(
                                    Users
                                    .aggregate(
                                        [
                                            {
                                                $lookup: {
                                                    from: "roles",
                                                    localField: "role_ids",
                                                    foreignField: "_id",
                                                    as: "roles"
                                                }
                                            },
                                            {
                                                $unwind: {
                                                    path: "$roles",
                                                }
                                            },
                                            {
                                                $lookup: {
                                                    from: "addressComment",
                                                    localField: "address._id",
                                                    foreignField: "address_id",
                                                    as: "address.addressComment",
                                                }
                                            }
                                            { $match: { email: formData?.email } },
                                            //  { $project: { role_ids: 0 } }
                                        ]
                                    )
                                )

    const data = userrolespermissions || {}
    


    return set_response(res, data, 200, 'success', ['Successfully logged in'])
};