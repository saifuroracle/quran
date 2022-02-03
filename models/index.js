const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.users = require("./users.model");
db.roles = require("./roles.model");
db.permissions = require("./permissions.model");

module.exports = db;
