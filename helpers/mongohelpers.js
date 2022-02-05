
const mongoResult = exports.mongoResult = async(command) => {

    return new Promise((resolve, reject) => {
        command
        .exec((error, data) => {
            if (error){
                return reject(error);
            }
            const string = JSON.stringify(data);
            const json = JSON.parse(string);
            resolve(json);
        })
    });

}


