const mysql = require('mysql');

class dbConnect{
    constructor(){
        this.host = process.env.DB_HOST;
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
        this.database = process.env.DB_DATABASE;
    }

    connect(){
        let connection = mysql.createConnection({
          host     : this.host,
          user     : this.user,
          password : this.password,
          database : this.database
        });

        return connection;
    }
}

module.exports = dbConnect;