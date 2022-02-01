const mongoose = require("mongoose");

const mongoResult = exports.mongoResult = (command) => {

    console.log('==========mongoresut========');
    return new Promise((resolve, reject) => {
        const data = command.exec((err, data) => {
                        if(data){
                            console.log('Email Valid');
                        }
                        else{
                            console.log('Error sending action: ', error);
                            return reject(error);
                        }
                    })

        if (error) {
            console.log('Error sending action: ', error);
            connection.end();
            return reject(error);
        }

        resolve(null);

    });

}


