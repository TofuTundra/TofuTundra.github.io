$(document).ready(function () {

  // gif suggestions 
  var searchItems = ["Oprah", "Alex Jones", "Yoda", "Trump",];

  // updates gifs
  function displayGifs() {

    var search = $(this).attr("search-item");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=IAKNKKg1bs3pNCVnos2Yj7fIZLXkZ9jS&q=" + search + "&limit=10&offset=0&rating=PG-13&lang=en";

    //ajax pull
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
    

      // rating data
      for (j = 0; j < response.data.length; j++) {
        var resultsDiv = $("<div class='results'>");
        // sets the gif url
        var imgURL = response.data[j].images.fixed_height.url;

        //puts gif into an img element
        var image = $("<img>").attr("src", imgURL);

        // attaches img element
        resultsDiv.append(image);

        // inserts gifs specified by the parameter, to the beginning of each element in the set of matched elements.
        $("#gifs").prepend(resultsDiv);

        var rating = response.data[j].rating;

        // puts the rating into a visable element
        var pOne = $("<h6>").text("Rating: " + rating);

        // attaches the rating
        resultsDiv.append(pOne);

      }

    });

  }

  // Function for displaying user generated buttons
  function renderButtons() {

    // prevents duplicates
    $("#buttons").empty();

    
    for (var i = 0; i < searchItems.length; i++) {

      // button making
      var a = $("<button>");
      // adding classes to the buttons
      a.addClass("item-btn");
      a.addClass("mouse-over-class");
      // Adding a data-attribute
      a.attr("search-item", searchItems[i]);
      // button text
      a.text(searchItems[i]);
      // attaches button to the html to be displayed
      $("#buttons").append(a);
    }
  }

  // generates buttons based on what's searched
  $("#search").on("click", function (event) {
    event.preventDefault();
    // sets the search item
    var item = $("#search-input").val().trim();
    // adds the newly added item to the existin array of items
    searchItems.push(item);

    
    renderButtons();
  });

  // upon clicking user generated buttons, gifs are displayed and updated
  $(document).on("click", ".item-btn", displayGifs);
  renderButtons();

});