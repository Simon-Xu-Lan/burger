// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
    arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

  // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        // The hasOwnProperty() method returns a boolean indicating whether the object has the specified property as its own property 
        // The hasOwnProperty() method in JavaScript is used to check whether the object has the specified property as its own property. This is useful for checking if the object has inherited the property rather than being it’s own.
        if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

  // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
    selectAll: function(tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";"
        connection.query(queryString, function(err, res) {
            if(err) throw err
            cb(res)
        })
    },
    insertOne: function(table, columns, values, cb) {
        let queryString = "INSERT INTO " + table + "(";
        queryString +=  columns.toString();
        queryString += ")"
        queryString += " VALUES ("
        queryString += printQuestionMarks(values.length)
        queryString += ") "

        // console.log(queryString)

        connection.query(queryString, values, function(err, result) {
            if(err) throw err
            cb(result)
        })
    },
    updateOne: function(table, columnsValuesObj, condition , cb) {
        let queryString = "UPDATE " + table
        queryString += " SET "
        queryString += objToSql(columnsValuesObj)
        queryString += " WHERE " + condition

        connection.query(queryString, function(err, result) {
            if(err) throw err
            cb(result)
        })
    },
      // handle delete
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
        }
    
        cb(result);
        });
    }
};

// Export the orm object for the model (cat.js).
module.exports = orm
