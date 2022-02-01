const Users = require("../models/users.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
const { mongoResult } = require('../helpers/mongohelpers');

exports.login = async (req, res) => {
    console.log('==============');
    let formData = {...req.query, ...req.body}

    console.log(formData);

    console.log('=========1=======');
    var login_q = mongoResult(Users.findOne({ email: formData?.email }))
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