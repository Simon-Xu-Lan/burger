* the server side route must be the the same as the client side route.
```
router.put("/api/burgers/:id", function(req, res){})
$.ajax("api/burgers" + id, )
The route is different and the client side route missed "/"

* the space might create SQL syntax error.
* form has its own method
* the client side js file "burgers.js" must be linked in main.handlebars.