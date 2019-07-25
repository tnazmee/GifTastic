var gifs = ["Kyrie Irving", "James Harden", "Tom Brady", "Lebron James", "Cristiano Ronaldo"];


function displayGifInfo() {
  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&tag=athlete";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    
    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='gif'>");
        var rating = results[i].rating;
        var pRating = $("<p>").text("Rating: " + rating);
        gifDiv.append(pRating);  
    
        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height.url);       
        gifDiv.prepend(personImage);
        
        $("#gifs-view").prepend(gifDiv);
    }
  });
}


function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");
    a.addClass("gif-btn");
    a.attr("data-name", gifs[i]);
    a.text(gifs[i]);
    $("#buttons-view").append(a);
  }
}


$("#add-gif").on("click", function(event) {
  event.preventDefault();

  var gif = $("#gif-input").val().trim();
  gifs.push(gif);
  renderButtons();
});


$(document).on("click", ".gif-btn", displayGifInfo);

renderButtons();