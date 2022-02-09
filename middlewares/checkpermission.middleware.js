const { header, body, validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Users = require("../models/users.model.js");
const { unique, json_process } = require('../helpers/datahelpers');

exports.checkpermissionMiddlware = (permission)=>{
    return  [
            header('authorization', 'Authorization is required').notEmpty().trim(),
            async (req, res, next) => {
        
                formData = {
                    "authorization": req.headers.authorization || ('Bearer ' + req.body.access_token),
                };
        
                const access_token = formData.authorization.split(' ')[1];
                try {
                    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
        
                    if (decoded._id) {

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
                                        email: decoded?.email
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

                        var permissions = []
                        userrolespermissions?.forEach(item => {
                            const permissions_arr = item.permissions
                            permissions_arr.forEach(permission => {
                                permissions.push(permission.permission)
                            });
                        });
                        permissions = permissions.filter(unique)   // permissions data


                        if (permissions.includes(permission)) {
                            next()
                        }
                        else{
                            return set_response(res, null, 401, 'failed', [`Unauthorized user for this permission(${permission})`])
                        }
                    } else {
                        return set_response(res, null, 401, 'failed', ['Unauthenticated'])
                    }
                } catch (error) {
                    return set_response(res, null, 401, 'failed', [error.message])
                }
        
            },
        ];
}

