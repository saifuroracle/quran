exports.set_response = (res, data, status_code, status, details) => {

    return res.status(200).json(
        {
            "status": status,
            "code": status_code,
            "data": data,
            "message": details
        }
    );

}