const Users = require("../models/users.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
const { mongoResult } = require('../helpers/mongohelpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { unique } = require('../helpers/datahelpers');

exports.login = async (req, res) => {
    let formData = { ...req.query, ...req.body }

    const existingUserData = await mongoResult(Users.findOne({ email: formData?.email }))

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

    const payload = {
        name: existingUserData.name,
        email: existingUserData.email,
        password: existingUserData.password,
        status: existingUserData.status,
        role_ids: existingUserData.role_ids,
    }

    var token = jwt.sign({...existingUserData}, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_EXPIRES_IN) });

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
    )


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
            ...existingUserData
        },
        roles: roles || [],
        permissions: permissions || [],
    }

    return set_response(res, data, 200, 'success', ['Successfully logged in'])
};