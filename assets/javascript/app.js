//Wait for whole page to load before Javascript
$(document).ready(function () {
    const topics = ["Star Wars", "Rick and Morty", "Game of Thrones", "Cats", "Dogs", "Storybots" ];

    for (let i = 0; i<topics.length; i++){
            let topicBtn = $("<button>");
              topicBtn.addClass('btn btn-outline-secondary mr-2 gif-btn');
              topicBtn.attr("gif-input", topics[i]);
              topicBtn.text(topics[i]);
              topicBtn.attr("data-gif", topics[i]);
              $(".gif-buttons").append(topicBtn);

            //   <button class='btn btn-outline-secondary mr-2 gif-btn' data-gif="cats">Cats</button>

    }

    const searchGif = gif => {
        $.get("https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC") .then(data => {
        
            for (let i = 0; i < 5; i++){
        $(".gifWindow").prepend(        
            `<img src='${data.data[i].images.original.url}' width=200 height=200 />`
        )  
    }
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