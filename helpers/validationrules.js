const { sqlResult } = require('./sqlhelpers');

exports.exists = async (tableName, column, data) => {
    let total_count = ( await sqlResult(`SELECT count('${column}') as total_count FROM ${tableName} WHERE ${column}='${data}' `))[0].total_count || 0 
    return total_count ? 1 : 0
}

exports.unique = async (tableName, column, data, column_to_ignore, column_to_ignore_data) => {
    let append_condition = (column_to_ignore && column_to_ignore_data) ? ` AND ${column_to_ignore}!='${column_to_ignore_data}'` : '';

    let is_exist = ( await sqlResult(`SELECT count('${column}') as total_count FROM ${tableName} WHERE ${column}='${data}' ${append_condition} `))[0].total_count || 0 
    return is_exist ? 0 : 1
}