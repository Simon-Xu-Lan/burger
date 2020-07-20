var express = require("express");

var router = express.Router();

// Import the model/burger.js to use database functions
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.selectAll(function(result) {
        var hbsObj = {
            burgers: result
        };
        res.render("index", hbsObj);
    });
});

router.post("/api/burgers", function(req, res) {
    console.log("contorller", req.body);
    burger.insertOne(
        ["burger_name", "devoured"],
        [req.body.burgerName, req.body.devoured],
        function(result) {
            // Send back the ID of the new insert id
            res.json({id: result.insertId});
        }
    );
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition: ", condition);
    var colValObj = {
        devoured: req.body.devoured
    }
    console.log(colValObj);
    burger.updateOne(colValObj, condition, function(result) {
        if(result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    console.log(req.params.id);
    var condition = "id = " + req.params.id;
    console.log("condition: ", condition);
    burger.delete(condition, function(result) {
        if(result.affectedRows == 0) {
            // if no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use
module.exports = router;