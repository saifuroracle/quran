// const Auth = require("../models/auth.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');

exports.login = (req, res) => {
    console.log('==============');
    // let formData = {...req.query, ...req.body}

    // Auth.login(formData, (err, data) => {
    //     if (err) {
    //         return set_response(res, data, 401, 'failed', err.message)
    //     } else {
    //         return set_response(res, data, 200, 'success', ['Successfully logged in'])
    //     }
    // });
};