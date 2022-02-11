const url = "https://wool-near-impulse.glitch.me/movies";

const optionsGet = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}

let submit = $("#submit");
let remove = $("#remove-btn5");

function displayMovies() {
    fetch(url, optionsGet)
        .then(response => response.json())
        .then(movies => {
            let html = "";
            console.log(movies);
            movies.forEach((movie => {
                html += `<li>title: ${movie.title}</li><li>genre: ${movie.genre}</li><li>director: ${movie.director}</li><li>actors: ${movie.actors}</li>
                    <li>id: ${movie.id}</li><li>plot: ${movie.plot}</li><li>poster: ${movie.poster}</li><li>rating: ${movie.rating}</li>
                    <li>year: ${movie.year}</li><button class="remove-btn" data-id="${movie.id}">DELETE</button><br>`
            }));
            $("#movie-list").append(html);
        }).then(() => {
        $("#loading-screen").removeClass("d-block").addClass("d-none");
        $("#movies-container").removeClass("d-none").addClass("d-block");
    }).then(() => {
        $(".remove-btn").on("click", function (e) {
            e.preventDefault();

            let id = $(this).attr("data-id");
            console.log(id);

            fetch(`https://wool-near-impulse.glitch.me/movies/${id}`, {
                method: 'DELETE'
            }).then(response => console.log(response.json()))
                .then(displayMovies);
        })
        //EDIT FUNCTIONALITY
    }).then(() =>{
        $("#submit-edit").click(function(e){
            e.preventDefault();
            let id = $('#id-edit').val();
            let title = $('#input-edit').val();
            let genre = $('#genre-edit').val();
            let director = $('#director-edit').val();
            let actor = $('#actor-edit').val();
            let plot= $('#plot-edit').val();
            let poster= $('#poster-edit').val();
            let rating= $('#rating-edit').val();
            let year= $('#year-edit').val();
            console.log(id)
//EDITING FROM THE MOVIE ID.
            fetch(`https://wool-near-impulse.glitch.me/movies/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: id,
                    title: title,
                    genre: genre,
                    director: director,
                    actors: actor,
                    plot:plot,
                    poster:poster,
                    rating:rating,
                    year:year
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })
                // .then(response => console.log(response.json()))
                // .then(json => console.log(json))
        })

    })

}

displayMovies();

submit.click(function (e) {
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
        .then(() => {
            $("#loading-screen").removeClass("d-block").addClass("d-none");
            $("#movies-container").removeClass("d-none").addClass("d-block");
        })
        .then(displayMovies);
})
// $("#submit-edit").click(function(e){
//     e.preventDefault();
//     let id = $('#id-edit').val();
//     let title = $('#input-edit').val();
//     let genre = $('#genre-edit').val();
//     let director = $('#director-edit').val();
//     console.log(id)
//
//     fetch(url, {
//         method: 'PUT',
//         body: JSON.stringify({
//             id: id,
//             title: title,
//             genre: genre,
//             director: director
//         }),
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8',
//         },
//         })
//         .then(response => console.log(response.json()))
//         .then(json => console.log(json))
// })
