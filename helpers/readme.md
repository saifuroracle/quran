# sqlhelpers.js

## paginate

### paginate = async (request, formData, tableName)

1. request = all the requests
2. formData all the formData
3. tableName, where the paginate will works, this only get the total row count of the table

#### steps
```
const { sqlResult, paginate } = require('../helpers/sqlhelpers');  



User.getAllUsers_p = async (formData, request, result) => {
    try {
        // formData = {...formData, perPage:2, page:2 }
        let paginator = await paginate(request, formData, 'users')
        var data = await sqlResult(`SELECT * FROM users LIMIT ${paginator?.record_per_page} OFFSET ${paginator?.offset}`)
        // offset
        if (data?.length) {
            data?.forEach(data => {
                delete data.password
            });
            result(null, {
                "data" : data,
                "paginator" : paginator
            });
            return;
        }
        result({ kind: "not_found" }, null);
    } catch (error) {
        result({ 'message': error?.message }, null);
        return;
    }
};


```

##### formData modify

1. perPage
   1. {...formData, perPage:5}
2. page
   1. {...formData, page:2}