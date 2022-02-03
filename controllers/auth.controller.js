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


    var userrolespermissions = await mongoResult(Users.findOne({ email: formData?.email }))
    console.log(userrolespermissions);
    
    // await sqlResult(`
    //             SELECT users.id user_id, roles.id role_id, roles.role role, permissions.id permission_id, permissions.permission permission 
    //             FROM users 
    //             LEFT JOIN  userroles ON (users.id = userroles.user_id)
    //             LEFT JOIN  roles ON (userroles.role_id = roles.id)
    //             LEFT JOIN  rolepermissions ON (roles.id = rolepermissions.role_id)
    //             LEFT JOIN  permissions ON (rolepermissions.permission_id = permissions.id)
    //             WHERE  userroles.deleted_at IS NULL AND roles.deleted_at IS NULL AND rolepermissions.deleted_at IS NULL
                // `) || []

                                // .exec((err, user) => {
                                //     if(user){
                                //         console.log('Email Valid');
                                //     }
                                //     else{
                                //         console.log('Email Doesn\'t exist');
                                //     }
                                // })
    console.log('=========2=======');
    // console.log(login_q);


    // Auth.login(formData, (err, data) => {
    //     if (err) {
    //         return set_response(res, data, 401, 'failed', err.message)
    //     } else {
    //         return set_response(res, data, 200, 'success', ['Successfully logged in'])
    //     }
    // });


    return set_response(res, null, 200, 'success', ['Successfully logged in'])
};