const mysql = require("mysql");

const sqlResult = exports.sqlResult = (query_str, query_var=[]) => {

    // console.log('===============', query);

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    connection.connect();
    return new Promise((resolve, reject) => {
        connection.query(query_str, query_var, function(error, results, fields) {
            if (error) {
                console.log('Error sending action: ', error);
                connection.end();
                return reject(error);
            }
            connection.end();
            resolve(results);
        });
    });
}


exports.paginate = async (request, formData, tableName) => {
    
    let api_url = process.env.BASE_URL+request.originalUrl
    let perPage = parseInt(formData?.perPage || 10)
    let currentPage = parseInt(formData?.page || 1)
    let total_count = ( await sqlResult(`SELECT count(*) as total_count FROM ${tableName}`))[0].total_count || 0 
    let pageCount = Math.ceil(total_count / perPage);
    let previousPage = currentPage>1 ? (currentPage - 1) : null;
    let nextPage = pageCount>currentPage ? (currentPage + 1) : null;
    let current_page_items_count = (total_count-(perPage*previousPage)) || 0
    let offset  = currentPage > 1 ? previousPage * perPage : 0; // start from 0,10,20,30

    let paginator = {
        "current_page": currentPage,
        "total_pages": pageCount,
        "previous_page_url": previousPage ? api_url+'?page='+previousPage: null,
        "next_page_url": nextPage ? api_url+'?page='+nextPage: null,
        "record_per_page": perPage,
        "current_page_items_count": current_page_items_count,
        "total_count": total_count ,
        "pagination_last_page": pageCount,
        "offset": offset,
    }
    return paginator;
}


