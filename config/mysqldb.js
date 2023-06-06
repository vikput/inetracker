const mysql = require('mysql');

class dbConnect{
    constructor(){
        this.host = process.env.DB_HOST;
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
        this.database = process.env.DB_DATABASE;
        return this.connect();
    }

    async makeConnection(){    
        let connection = await mysql.createConnection({
          host     : this.host,
          user     : this.user,
          password : this.password,
          database : this.database
        });
        //console.log(connection);
        return connection;
    }

    async connect(){
        return await this.makeConnection();
    }

}

module.exports = dbConnect;