
const mongoResult = exports.mongoResult = (command) => {

    console.log('==========mongoresut========');

    return new Promise((resolve, reject) => {
        const data = command
        .exec((error, data) => {
            if (error){
                return reject(error);
            }
            resolve(data);
        })

        resolve(null)

    });

}


