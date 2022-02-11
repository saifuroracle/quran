const fs = require('fs-extra');
const datehelpers = require('./datehelpers');

const log = exports.log = async (message, errorType='Error') => {
    var LogFile = `./storage/logs/${datehelpers.todayYMD}.log`
    fs.ensureFileSync(LogFile)
    
    var logDate = await datehelpers.now
    fs.appendFile(LogFile, `${logDate}  |||| ${errorType.toUpperCase()} |||| ${message} \r\n`, function (err) {
        if (err) return console.log(err);
    });
}




// errorType 
// ==========
// Info
// Warning
// Error
// Critical
// Debug
// alert
// emergency
