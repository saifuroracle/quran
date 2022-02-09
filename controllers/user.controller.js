const Users = require("../models/users.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
const { unique, json_process } = require('../helpers/datahelpers');


exports.getUser = async (req, res) => {
    let formData = {...req.query, ...req.body}

    var user_data = await Users.findOne({'_id': formData._id}) || {}
    user_data = await json_process(user_data)

    delete user_data.password

    return set_response(res, user_data, 200, 'success', ['User data.'])
};


exports.userStatusUpdate = async (req, res) => {

    let formData = {...req.query, ...req.body}
    await Users.updateMany(
        {
            _id: formData._id,
        },
        {
            $set: {
                status: formData.status,
            }
        }
    )
    
    return set_response(res, null, 200, 'success', ['Successfully user status updated'])
};



exports.getAllUsers_p = (req, res) => {
    let formData = {...req.query, ...req.body}

    return set_response(res, null, 200, 'success', ['Users data.'])
};