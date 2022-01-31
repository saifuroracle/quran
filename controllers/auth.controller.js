const Auth = require("../models/auth.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
// Create and Save a new Auth
exports.register = (req, res) => {

    // Create a Auth
    let formData = {...req.query, ...req.body}

    // Save Auth in the database
    Auth.register(formData, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', err.message)
        }
        else {
            return set_response(res, data, 200, 'success', ['Successfully completed'])
        }
    });
};



exports.login = (req, res) => {
    let formData = {...req.query, ...req.body}

    Auth.login(formData, (err, data) => {
        if (err) {
            return set_response(res, data, 401, 'failed', err.message)
        } else {
            return set_response(res, data, 200, 'success', ['Successfully logged in'])
        }
    });
};

exports.me = (req, res) => {

    formData = {
        "authorization": req.headers.authorization || ('Bearer ' + req.body.access_token),
    };

    // Save Auth in the database
    Auth.me(formData, (err, data) => {
        if (err) {
            return set_response(res, data, 400, 'failed', err.message)
        } else {
            return set_response(res, data, 200, 'success', ['My user data!'])
        }
    });
};

exports.logout = (req, res) => {

    formData = {
        "authorization": req.headers.authorization || ('Bearer ' + req.body.access_token),
    };

    Auth.logout(formData, (err, data) => {
        if (err) {
            return set_response(res, data, 400, 'failed', err.message)
        } else {
            return set_response(res, data, 200, 'success', ['Successfully logged out!'])
        }
    });
};

exports.changePassword = (req, res) => {

    let formData = {...req.query, ...req.body}

    Auth.changePassword(formData, (err, data) => {
        if (err) {
            return set_response(res, data, 400, 'failed', err.message)
        } else {
            return set_response(res, data, 200, 'success', ['Successfully changed password!'])
        }
    });
};