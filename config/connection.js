// import dependencies
const mysql = require('mysql')

// create mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burgers_db"
})

connection.connect(function(err) {
    if(err) throw err
    console.log("Connected to burgers_db")
})

module.exports = connection
