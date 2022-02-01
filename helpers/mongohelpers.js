const mongoose = require("mongoose");

const mongoResult = exports.mongoResult = (command) => {

    console.log('==========mongoresut========');

    return new Promise((resolve, reject) => {
        const data = command
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


