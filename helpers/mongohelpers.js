
const mongoResult = exports.mongoResult = async(command) => {

    return new Promise((resolve, reject) => {
        const data = command
        .exec((error, data) => {
            if (error){
                return reject(error);
            }
            resolve(data);
        })
    });

}


