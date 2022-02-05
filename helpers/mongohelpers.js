
const mongoResult = exports.mongoResult = async(command) => {

    return new Promise((resolve, reject) => {
        command
        .exec((error, data) => {
            if (error){
                return reject(error);
            }
            resolve(data);
        })
    });

}


