$(document).ready(function() {
    var animals = ["Baby Elephants","Pandas","Border Collies"];
    //  var topics = []; 
       function renderButtons() {
    
         for (let i = 0; i < animals.length; i++) {
          var a = $("<button>");
          a.addClass("btn btn-outline-primary v-buttons");
          a.attr("type","submit")
          a.attr("animal-name", animals[i]);
          a.text(animals[i]);
          $("#v-button-dump").append(a);
          }
        }
        console.log(animals);

      // Add more animal buttons
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        $("#v-button-dump").empty();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        renderButtons();
        $('#animal-input').val('');
      });

    $("#v-button-dump").on("click", ".v-buttons", function() {
    $(".pulled-gifs").empty();
        var critter = $(this).attr("animal-name");
        console.log(critter);
        // var critter = $("animal-name").val().trim();
        var queryUrl = "https://api.giphy.com/v1/gifs/search?&api_key=wWX5wBEQ3RQFPxDKhcxCfgKtGOIMNQuK&rating=g&limit=10&q=" + critter;
    
            // Performing our AJAX GET request
         console.log(queryUrl);
            $.ajax({
            url: queryUrl,
            method: "GET"
            })
            // After the data comes back from the API
            .then(function(response) {
            // Storing an array of results in the results variable
             var results = response.data;
             // Looping over every result item
             for (var i = 0; i < results.length; i++) {
             // Creating a div for the gif
             var gifDiv = $("<div>");
            gifDiv.addClass("preview");
             // Storing the result item's rating and title
            var rating = results[i].rating;
            var title = results[i].title;
            // Creating a span tag to load up the gifs left to right
            var p = $("<span>").html("Rating: " + rating + "<br> Title: " + title + "<br>");
            // Creating an image tag
            var critterImage = $("<img>");
             // Giving the image tags that will allow for the stop/restart of animation
            critterImage.attr("src", results[i].images.fixed_height_still.url);
            critterImage.attr("data-still", results[i].images.fixed_height_still.url);
            critterImage.attr("data-animate", results[i].images.fixed_height.url);
            critterImage.attr("data-state", "still");
            critterImage.addClass("gif");
            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(critterImage);
            // Prepending the gifDiv to the "#pulled-gif" div in the HTML
            $(".pulled-gifs").append(gifDiv);
          }
        })
  });
    $(document).on("click", ".gif", function() {
    // $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
 renderButtons()
});










