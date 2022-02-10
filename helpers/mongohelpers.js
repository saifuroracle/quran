const mongoose = require("mongoose");

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


exports.paginate = async (request, formData, collection) => {
    
    const model = require(`../models/${collection}.model.js`);

    let api_url = process.env.BASE_URL+request.originalUrl
    let perPage = parseInt(formData?.perPage || 10)
    let currentPage = parseInt(formData?.page || 1)

    // let total_count = ( await sqlResult(`SELECT count(*) as total_count FROM ${collection}`))[0].total_count || 0 
    let total_count = await model.count() || 0

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
