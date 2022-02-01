const mongoose = require("mongoose");

const Users = require("../models/users.model.js");
const mongoResult = exports.mongoResult = () => {

    console.log('==========mongoresut========');

    // const data =  await command
    // console.log(data);

    // return data

        // .exec((error, data) => {
        //     if (error){
        //         console.log('Error sending action: ', error);
        //         return reject(error);
        //     }
        //     resolve(data);
        // })


    return new Promise((resolve, reject) => {
        Users.findOne({ email: 'admin@gmail.com' })
        .exec((error, data) => {
            if (error){
                console.log('Error sending action: ', error);
                return reject(error);
            }
            resolve(data);
        })

        // resolve(121111111) 
        // .exec((error, data) => {
        //     if (error){
        //         console.log('Error sending action: ', error);
        //         return reject(error);
        //     }
        //     resolve(data);
        // })
        // resolve(null);

    });

}


