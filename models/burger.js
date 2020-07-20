const orm = require('../config/orm')

const burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(result) {
            cb(result)
        })
    },
    insertOne: function(columns, values, cb) { 
        orm.insertOne("burgers", columns, values, function(res) {
            cb(res)
        })
    },
    updateOne: function(columnsValuesObj, condition, cb) {
        orm.updateOne("burgers", columnsValuesObj, condition, function(res) {
            cb(res)
        })
    },
    delete: function(condition, cb) {
        orm.delete("burgers", condition, function(res) {
            cb(res);
        });
    }
} 

module.exports = burger