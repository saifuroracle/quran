const { unique, json_process } = require('../helpers/datahelpers');

exports.exists = async (collection, column, data) => {
    const model = require(`../models/${collection}.model.js`);
    
    let existingData = await model.findOne({ [column]: data }) || {}
    existingData = await json_process(existingData)
    // console.log(model);
    // console.log(existingData);
    // console.log({ [column]: data });

    let exists = 0 

    // console.log('existingData[column]', existingData[column]);
    if (existingData[column] && existingData[column] == data) {
        exists = 1
    }
    return exists
}

// exports.unique = async (tableName, column, data, column_to_ignore, column_to_ignore_data) => {
//     let append_condition = (column_to_ignore && column_to_ignore_data) ? ` AND ${column_to_ignore}!='${column_to_ignore_data}'` : '';

//     let is_exist = ( await sqlResult(`SELECT count('${column}') as total_count FROM ${tableName} WHERE ${column}='${data}' ${append_condition} `))[0].total_count || 0 
//     return is_exist ? 0 : 1
// }