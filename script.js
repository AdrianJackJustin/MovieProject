const url = "https://wool-near-impulse.glitch.me/movies";

const optionsGet = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}

let submit = $("#submit");
let remove = $("#remove-btn5");

function displayMovies(){
    fetch(url, optionsGet)
        .then(response => response.json())
        .then(movies => {
            let html="";
            console.log(movies);
            movies.forEach((movie => {
                html += `<li>title: ${movie.title}</li><li>genre: ${movie.genre}</li><li>director: ${movie.director}</li><li>actors: ${movie.actors}</li>
                    <li>id: ${movie.id}</li><li>plot: ${movie.plot}</li><li>poster: ${movie.poster}</li><li>rating: ${movie.rating}</li>
                    <li>year: ${movie.year}</li><button id=${movie.id} class="deletesumnth">Remove</button><br>`;
                $(".deletesumnth").on("click", function removeMovie (e) {
                    e.preventDefault();
                    fetch(`https://wool-near-impulse.glitch.me/${movie.id}`, {
                        method: 'DELETE'
                    }).then(response => console.log(response.json()))
                })
            }));
            $("#movie-list").append(html);
        }).then(()=>{
        $("#loading-screen").removeClass("d-block").addClass("d-none");
        $("#movies-container").removeClass("d-none").addClass("d-block");
    });
}
displayMovies();



submit.click(function(e){
    e.preventDefault();
    let title = $('#input').val();
    let genre = $('#genre').val();
    let director = $('#director').val();
    console.log(title);

    fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                genre: genre,
                director: director
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
    })
        .then(response => console.log(response.json()))
        .then(json => console.log(json))
        .then(()=>{
            $("#loading-screen").removeClass("d-block").addClass("d-none");
            $("#movies-container").removeClass("d-none").addClass("d-block");
        })
        .then(displayMovies);
})


