//Wait for whole page to load before Javascript
$(document).ready(function () {
    const topics = ["Star Wars", "Rick and Morty", "Game of Thrones", "Cats", "Dogs", "Storybots"];
    let isStillOn = true;

    //Setup buttons dynamically created by looping through array and assigning classes and attributes

    for (let i = 0; i < topics.length; i++) {
        let topicBtn = $("<button>");
        topicBtn.addClass('btn btn-secondary mr-2 gif-btn');
        topicBtn.attr("gif-input", topics[i]);
        topicBtn.text(topics[i]);
        topicBtn.attr("data-gif", topics[i]);
        $(".gif-buttons").append(topicBtn);

    }

    //On Click Function of Dynamic Button via gif-btn class. passes gifClicked to searchGif AJAX function

    $(document).on("click", ".gif-btn", function (event) {
        let gifClicked = $(this).data("gif");
        searchGif(gifClicked);
    })

    //Function that takes above data, makes an AJAX call to API, then takes the response and prepends as 
    // a Bootstrap card. 

    const searchGif = gif => {
        $.get("https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC").then(data => {

            for (let i = 0; i < 6; i++) {
                $(".gifWindow").prepend(`

                <div class="card" style="width: 25rem;">
                    <img class="card-img-top still" src="${data.data[i].images.fixed_height_still.url}" data-still='${data.data[i].images.fixed_height_still.url}' data-original='${data.data[i].images.original.url}' height=300 />
                        <div class="card-body">
                            <p class="card-text">Rated: ${data.data[i].rating}</p>
                         </div>
                </div>

                    
                `)
            }
        });
    }


    //On click that takes the text in the form and creates a Dynamic button to add to the current list

    $(".add-gif-btn").on("click", function (event) {
        event.preventDefault();
        let gif = $(".gif-input").val();
        $(".gif-buttons").append(`
            
            <button class='btn btn-warning mr-2 gif-btn' data-gif='${gif}'>
                ${gif}
            </button>
        `)
    });

    //onClick of a "Still", switches over to actual GIF, or flipping back to the still.

    $(document).on("click", ".still", function (event) {
        if (isStillOn) {
            $(this).attr("src", $(this).data("original"));
            $(this).addClass("playing");
            isStillOn = false;
        } else {
            $(this).attr("src", $(this).data("still"))
            $(this).removeClass("playing");
            isStillOn = true;
        }

    })

});