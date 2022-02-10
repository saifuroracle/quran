const jwt = require('jsonwebtoken');
const { unique, json_process } = require('./datahelpers');
const mongoose = require("mongoose");
const Users = require("../models/users.model.js");

const Authorization = exports.Authorization = async(req) => {
    let authorization = req?.headers?.authorization || ('Bearer ' + req?.body?.access_token)
    return authorization;
}

const AccessToken = exports.AccessToken = async(req) => {
    let access_token = await Authorization(req)
    access_token = access_token.split(' ')[1]
    return access_token;
}


const Auth = exports.Auth = async (req) => {
    const access_token = await AccessToken(req);
    
    try {
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
        if (decoded) {
            let userdata = await Users.findOne({ email: decoded?.email }) || {}
            userdata = await json_process(userdata)
            delete userdata.password
            return userdata;
        }
    } catch (error) {
        return {};
    }
}

const AuthRoles = exports.AuthRoles = async (req) => {
    let AuthRoles = await Auth(req);
    
    var roles = await sqlResult(`
                SELECT users.id user_id, roles.role , roles.deleted_at, userroles.deleted_at
                FROM users 
                LEFT JOIN  userroles ON (users.id = userroles.user_id)
                LEFT JOIN  roles ON (userroles.role_id = roles.id)
                WHERE users.id='${AuthRoles?.id}' AND roles.deleted_at IS NULL AND userroles.deleted_at IS NULL
                `) || []
    AuthRoles.roles = roles.map(item => item.role)
    return AuthRoles
}

const AuthRolesPermissions = exports.AuthRolesPermissions = async (req) => {
    let Auth_d = await Auth(req);
    
    var userrolespermissions = await sqlResult(`
                                SELECT users.id user_id, roles.id role_id, roles.role role, permissions.id permission_id, permissions.permission permission 
                                FROM users 
                                LEFT JOIN  userroles ON (users.id = userroles.user_id)
                                LEFT JOIN  roles ON (userroles.role_id = roles.id)
                                LEFT JOIN  rolepermissions ON (roles.id = rolepermissions.role_id)
                                LEFT JOIN  permissions ON (rolepermissions.permission_id = permissions.id)
                                WHERE  userroles.deleted_at IS NULL AND roles.deleted_at IS NULL AND rolepermissions.deleted_at IS NULL
                            `) || []

    var roles = userrolespermissions.filter(item => (item.user_id == Auth_d.id && item.role)).map(item => item.role)
    roles = roles.filter(unique)
    var permissions = userrolespermissions.filter(item => (item.user_id == Auth_d.id && item.permission)).map(item => item.permission)

    AuthRolesPermissions_d = {
        ...Auth_d,
        'roles': roles,
        'permissions': permissions,
    }


    return AuthRolesPermissions_d
}