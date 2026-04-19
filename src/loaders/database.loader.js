const { Config } = require("../configs/config");
const { DBService } = require("../db/db-service");

class DatabaseLoader {
    static init (){
        const mysqlUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;
        
        if (mysqlUrl) {
            // Parse from URL: mysql://user:pass@host:port/database
            const url = new URL(mysqlUrl);
            DBService.init({
                host: url.hostname,
                port: parseInt(url.port) || 3306,
                user: url.username,
                password: url.password,
                database: url.pathname.replace('/', ''),
                dateStrings: ['DATE', 'DATETIME']
            });
        } else {
            DBService.init({
                host: Config.DB_HOST,
                user: Config.DB_USER,
                password: Config.DB_PASS,
                database: Config.DB_DATABASE,
                dateStrings: ['DATE', 'DATETIME']
            });
        }

        DBService.checkConnection();
    }
}

module.exports = { DatabaseLoader };
