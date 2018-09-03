//Wait for whole page to load before Javascript
$(document).ready(function () {

    // Example queryURL for Giphy API

    // const queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).then(function(response) {
    //   console.log(response);
    // });

    const searchGif = gif => {
        $.get("https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC") .then(data => {
            $(".gifWindow").prepend(
                // <img src="https://giphy.com/embed/cfuL5gqFDreXxkWQ4o"></img>
                
                
            `<img src='${data.data[0].images.original.url}' />`
        )  
        console.log(data.data[0].bitly_gif_url);
        });
    }

    $(document).on("click", ".gif-btn", function(event){
        let gifClicked = $(this).data("gif");
        searchGif(gifClicked);
    })

    $(".add-gif-btn").on("click", function(event) {
        event.preventDefault();
        let gif = $(".gif-input").val();
        $(".gif-buttons").append(
            `<button class='btn btn-outline-secondary mr-2 gif-btn' data-gif='${gif}'>
                ${gif}
            </button>`
        )
    });


});