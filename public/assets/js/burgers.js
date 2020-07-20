
$(function(){
    $(".create-burger").on("submit", function(event) {
        event.preventDefault();
        console.log("submit has been clicked")
        var newBurger = {
            burgerName: $("#name").val().trim(),
            devoured: 0 // set the value is false by default
        };
        
        // Send post request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        })
        .then(function() {
            location.reload();
        });
    });

    $(".devour-burger").on("click", function(event) {
        var id = $(this).data("id");
        var newDevoured = {
            devoured: 1
        }

        // send the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevoured
        })
        .then(function() {
            // Reload the page to get the updated list
            location.reload();
        });

    });

    $(".delete-burger").on("click", function(event) {
        var id = $(this).data("id");
        console.log("delete id: ", id);
        
        // send the delete request
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        })
        .then(function() {
            console.log("delete id: ", id);
            // reload the page to get the update page
            location.reload();
        });
    });
});