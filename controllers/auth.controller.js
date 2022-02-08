const Users = require("../models/users.model.js");
const AccessTokens = require("../models/access_tokens.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
const { now, datetimeYMDHMS } = require('../helpers/datehelpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { unique, json_process } = require('../helpers/datahelpers');

exports.login = async (req, res) => {
    let formData = { ...req.query, ...req.body }

    let existingUserData = await Users.findOne({ email: formData?.email })
    existingUserData = await json_process(existingUserData)

    if (!existingUserData) {
        return set_response(res, null, 422, 'failed', ['Invalid email!'])
    }

    if (existingUserData.status != 'active') {
        return set_response(res, null, 422, 'failed', [`User is ${existingUserData.status || 'inactive'}!`])
    }

    plain_password = formData.password
    hash = existingUserData.password
    password_validity = await bcrypt.compare(plain_password, hash)

    if (!password_validity) {
        return set_response(res, null, 422, 'failed', [`Invalid password!`])
    }

    delete existingUserData.password


    var token = jwt.sign({...existingUserData}, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_EXPIRES_IN) });

    expires_at = moment().add(process.env.JWT_EXPIRES_IN, 'seconds').format('yy-MM-DD HH:mm:ss')


    var userrolespermissions = await Users.aggregate(
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
                                            $unwind: "$roles",
                                        },
                                        {
                                            $lookup: {
                                                from: "permissions",
                                                localField: "roles.permission_ids",
                                                foreignField: "_id",
                                                as: "permissions",
                                            }
                                        },
                                        {
                                            $match: {
                                                email: formData?.email
                                            }
                                        },
                                        {
                                            $project: {
                                                role_ids: 0,
                                                "roles.permission_ids": 0
                                            }
                                        }
                                    ]
                                )

    userrolespermissions = await json_process(userrolespermissions)

    var roles = userrolespermissions?.map(item => item?.roles?.role)  // roles data
    var permissions = []
    userrolespermissions?.forEach(item => {
        const permissions_arr = item.permissions
        permissions_arr.forEach(permission => {
            permissions.push(permission.permission)
        });
    });
    permissions = permissions.filter(unique)   // permissions data

    var data = {
        user: {
            ...existingUserData,
            'access_token': null,
            'token_type': 'Bearer',
            'expires_at': expires_at,
        },
        roles: roles || [],
        permissions: permissions || [],
    }


    // previous access_token check. 
    var user_existing_valid_access_token_q = await AccessTokens.find({
            user_id: existingUserData._id,
            status: 'active',
            expires_at: { $gt: now }
        })
    console.log(user_existing_valid_access_token_q);
    user_existing_valid_access_token_q = await json_process(user_existing_valid_access_token_q)

    if (user_existing_valid_access_token_q.length==0) 
    {
        let access_token_row = new AccessTokens({
            "user_id": existingUserData._id,
            "token": token,
            "status": "active",
            "expires_at": expires_at,
        })

        access_token_row = await access_token_row.save().then(data => {
        }).catch(err => {
        })

        data = {
            ...data,
            user:{
                ...data.user,
                'access_token': token,
            }
        }

    }
    else if (user_existing_valid_access_token_q.length) {
        expires_at = moment(user_existing_valid_access_token_q[0].expires_at).format('yy-MM-DD HH:mm:ss')

        data = {
            ...data,
            user:{
                ...data.user,
                'access_token': user_existing_valid_access_token_q[0].token,
                'expires_at': expires_at,
            }
        }
    }

    return set_response(res, data, 200, 'success', ['Successfully logged in'])
};