const url = "https://wool-near-impulse.glitch.me/movies";

const optionsGet = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}

let submit = $("#submit");

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
wait(2000).then(displayMovies);

function displayMovies() {
    fetch(url, optionsGet)
        .then(response => response.json())
        .then(movies => {
            let html = "";
            console.log(movies);
            movies.forEach((movie => {
                //<div class="card" style="width: 18rem;">
                //   <img src="..." class="card-img-top" alt="...">
                //   <div class="card-body">
                //     <h5 class="card-title">Card title</h5>
                //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                //     <a href="#" class="btn btn-primary">Go somewhere</a>
                //   </div>
                // </div>
                html += `<div class="card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png" class="card-img-top" style="height: 100px; width: 100px" alt="...">poster: ${movie.poster}</img>
                            <div class="card-body">
                            <h5 class="card-title">title: ${movie.title}</h5>
                            <p class="card-text">director: ${movie.director}<br>rating: ${movie.rating}<br>year: ${movie.year}</p>
                            <button class="remove-btn btn-primary" data-id="${movie.id}">DELETE</button>
                            </div>
                        </div>`
            }));
            // <li></li>
            // <li>genre: ${movie.genre}</li>
            // <li>director: ${movie.director}</li>
            // <li>actors: ${movie.actors}</li>
            // <li>id: ${movie.id}</li>
            // <li>plot: ${movie.plot}</li>
            // <li>poster: ${movie.poster}</li>
            // <li>rating: ${movie.rating}</li>
            // <li>year: ${movie.year}</li>
            // <button className="remove-btn" data-id="${movie.id}">DELETE</button>
            // <br>
            $("#movie-list").append(html);
        }).then(() => {
        $("#loading-screen").removeClass("d-block").addClass("d-none");
        $("#movies-container").removeClass("d-none").addClass("d-block");
    })
        .then(() => {
        $(".remove-btn").click(function(e){
            e.preventDefault();

            let id = $(this).attr("data-id");
            console.log(id);

            fetch(`https://wool-near-impulse.glitch.me/movies/${id}`, {
                method: 'DELETE'
            }).then(response => console.log(response.json()))
                .then(displayMovies);
        })

    })
        //EDIT FUNCTION---------------------------------------------------------
        .then(() =>{
        $("#submit-edit").click((e)=>{
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
    //EDITING OBJECT BY GRABBING FROM USER INPUT FOR THE MOVIE ID.
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
        })
    })
}


//-------------------------------------------------------------------------------------------------
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
