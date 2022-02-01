const mongoose = require("mongoose");

const Users = require("../models/users.model.js");
const mongoResult = exports.mongoResult = () => {

    console.log('==========mongoresut========');

    return new Promise((resolve, reject) => {
        const data = Users.findOne({ email: 'admin@gmail.com' })
        .exec((error, data) => {
            if (error){
                console.log('Error sending action: ', error);
                return reject(error);
            }
            resolve(data);
        })

        resolve(null)

    });

}


