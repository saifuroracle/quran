const moment = require('moment');

exports.now = moment().format('yy-MM-DD HH:mm:ss')

exports.todayYMD = moment().format('yy-MM-DD')
exports.todayDMY = moment().format('DD-MM-yy')