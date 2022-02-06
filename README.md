# Quran

## Built With

<!-- What things you need to install the software and how to install them -->

| Build With | Version  |
| ---------- | -------- |
| Node       | v14.16.1 |
| Mongoose   | ^6.1.9   |

# Structures
    * mongodb
      * mongoose
    * node
    * express
    * jwt
    * validation
    * middleware
    * api
    * mail
      * handlebar
    * excel
    * csv
    * pdf
    * queue
    * log
    * schedule
    * enum

# commands 

## General Commands
  
```
node -v
npm init
npm install express express-validator nodemon dotenv mongoose multer body-parser cors jsonwebtoken bcryptjs moment nodemailer express-handlebars fs-extra exceljs --save

npm start

```

## Mongo Commands
  
```
create folder => C:\data\db
in cmd  run => mongod 
in another cmd  run => mongo
in compass =>
mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false

db.dropDatabase("quran") ;
show dbs;
use quran ;
db.createCollection("users");
show collections
db.users.remove({});

```

## Backup

### Backup Desktop
```

  cmd: 
    cd /
    E:
    cd E:\Projects\0.personal\quran
    mongodump -d quran

```

# Resource
* https://www.youtube.com/watch?v=vjf774RKrLc&t=789s
* 