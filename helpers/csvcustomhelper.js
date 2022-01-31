const fse = require('fs-extra');
const fs = require('fs');
const csvInstant_save = exports.csvInstant_save = (data=[], filePath='') => {

    let csvContent = "";

    let header = Object.keys(data[0]);
    csvContent += header + "\r\n";
    
    data.forEach(function(rowArray) {
        let row_data = Object.values(rowArray)
        let row = row_data.join(",");
        csvContent += row + "\r\n";
    });
    
    fse.ensureFileSync(filePath)

    const writeStream = fs.createWriteStream(filePath, {encoding: 'utf8'});
    writeStream.write(csvContent);
}

// csvcustomhelper.csvInstant_save(data, './public/uploads/user/users-data-'+todayYMD+'.csv')
