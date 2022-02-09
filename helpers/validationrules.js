const { unique, json_process } = require('../helpers/datahelpers');

exports.exists = async (collection, column, data) => {
    const model = require(`../models/${collection}.model.js`);
    
    let existingData = await model.findOne({ [column]: data }) || {}
    existingData = await json_process(existingData)

    let exists = 0 

    if (existingData[column] && existingData[column] == data) {
        exists = 1
    }
    return exists
}

exports.unique = async (collection, column, data, column_to_ignore, column_to_ignore_data) => {
    const model = require(`../models/${collection}.model.js`);

    let existingData = []

    if (column_to_ignore && column_to_ignore_data) {
        existingData = await model.find({ [column]: data, [column_to_ignore]: { $ne:column_to_ignore } }) || []
    } else {
        existingData = await model.find({ [column]: data }) || []
    }
    existingData = await json_process(existingData)

    return existingData.length ? 0 : 1
}