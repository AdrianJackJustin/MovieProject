const url = "https://wool-near-impulse.glitch.me/movies";

const optionsGet = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}

function displayMovies(){
    fetch(url, optionsGet)
        .then(response => response.json())
        .then(movies => {
            let html;
            console.log(movies);
            movies.forEach((movie => {
                html += `<li>${movie.actors}</li><li>${movie.director}</li><li>${movie.genre}</li>
                    <li>${movie.id}</li><li>${movie.plot}</li><li>${movie.poster}</li><li>${movie.rating}</li>
                    <li>${movie.title}</li><li>${movie.year}</li>`;
            }));

            $("#movie-list").append(html);
        }).then(()=>{
        $("#loading-screen").removeClass("d-block").addClass("d-none");
        $("#movies-container").removeClass("d-none").addClass("d-block");
    });
}

displayMovies();