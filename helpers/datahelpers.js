exports.unique = (value, index, self) => {
    return self.indexOf(value) === index;
}

exports.json_process = async(data) => {

    const string = JSON.stringify(data);
    const json = JSON.parse(string);

    return json;
}