const Users = require("../models/users.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');



exports.getUser = (req, res) => {
    let formData = {...req.query, ...req.body}

    User.getUser(formData, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found") {
                return set_response(res, data, 204, 'failed', [`Not found any user with id ${req.body.id}.`])
            }
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['User data.'])
        }
    });
};


