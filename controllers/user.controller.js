const Users = require("../models/users.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
const { unique, json_process } = require('../helpers/datahelpers');
const { paginate } = require('../helpers/mongohelpers');
const authhelper = require('../helpers/authhelper');
const bcrypt = require('bcryptjs');


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



exports.getAllUsers_p = async (req, res) => {
    let formData = {...req.query, ...req.body}

    let paginator = await paginate(req, formData, 'users')
    var data_list = await Users.find().limit(paginator?.record_per_page).skip(paginator?.offset) || []
    data_list = await json_process(data_list)

    var data = {}
    if (data_list?.length) {

        data_list?.map(item => {
            delete item.password
            return item
        });

        data_list.forEach(item=>{
            delete item.password
        })

        data =  {
            "data" : data_list,
            "paginator" : paginator
        }
    }

    return set_response(res, data, 200, 'success', ['Users data.'])
};

exports.createUser = async (req, res) => {
    let formData = {...req.query, ...req.body}

    var creator = await authhelper.Auth(req);

    formData.password = bcrypt.hashSync(formData.password, 10)

    const roles = formData.roles || []
    
    delete formData.roles
    formData.created_by = creator?._id

    return set_response(res, creator, 200, 'success', ['User successfully created.'])
};
