exports.unique = (value, index, self) => {
    return self.indexOf(value) === index;
}

exports.json_process = async(data) => {

    const string = JSON.stringify(data);
    const json = JSON.parse(string);

    return json;
}

exports.object_filter = (data_object, allowed_keys=[]) => {

    const filtered = Object.keys(data_object)
    .filter(key => allowed_keys.includes(key))
    .reduce((obj, key) => {
        obj[key] = data_object[key];
        return obj;
    }, {});

    return filtered || {}
}