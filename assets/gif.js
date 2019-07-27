$(document).ready(function () {
var topics = ["Kyrie Irving", "James Harden", "Tom Brady", "Lebron James", "Cristiano Ronaldo"];


function displayGifInfo() {
  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&tag=athlete";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    
    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var pRating = $("<p>").text("Rating: " + rating); 
        var personImage = $("<img>");
        personImage.attr("src", results[i].images.original_still.url);
        personImage.attr("data-still", results[i].images.original_still.url);
        personImage.attr("data-animate", results[i].images.original.url);
        personImage.attr("data-state", "still");
        personImage.addClass("gif");
        gifDiv.prepend(pRating);
        gifDiv.prepend(personImage); 
        $("#gifs-view").prepend(gifDiv);
        
    }
    
    $(".gif").on("click", function(){
        var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state === "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}
		else {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
        } 
    });
  });
  
}


function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("gif-btn");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}


$("#add-gif").on("click", function(event) {
  event.preventDefault();

  var gif = $("#gif-input").val().trim();
  topics.push(gif);
  renderButtons();
});


$(document).on("click", ".gif-btn", displayGifInfo);

renderButtons();
});