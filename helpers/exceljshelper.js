
const Excel = require('exceljs')
const fse = require('fs-extra');

const excelInstant_save = exports.excelInstant_save = (data=[], filePath='') => {
    fse.ensureFileSync(filePath)

    let workbook = new Excel.stream.xlsx.WorkbookWriter({
        filename: filePath
    });
    let worksheet = workbook.addWorksheet('Sheet');

    let header = Object.keys(data[0]);
    // worksheet.addRow(header).commit();

    // ==========header processing===========
    let headers_arr = Object.keys(data[0]);
    let headers = []
    headers_arr.forEach((item, i)=>{
        console.log(i);
        headers[i] = {
            header: item
        }
    })

    worksheet.columns = headers

    worksheet.columns.forEach(column => {
        let col_data = data[0][column.header] || '';
        let col_data_length = col_data?.length || 0;
        column.width = col_data_length<10 ? 10 : col_data_length+2
    })
    // ==========header processing===========
    
    data.forEach(function(rowArray) {
        let row_data = Object.values(rowArray)
        worksheet.addRow(row_data).commit();
    });

    workbook.commit();
}