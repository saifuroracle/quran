const moment = require('moment');

exports.now = moment().format('yy-MM-DD HH:mm:ss')

exports.todayYMD = moment().format('yy-MM-DD')
exports.todayDMY = moment().format('DD-MM-yy')

// datetimeYMDHMS('2022-02-08T09:45:48.804Z')
exports.datetimeYMDHMS = (datetime) => moment(datetime).format('yy-MM-DD HH:mm:ss') 
