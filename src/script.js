const url = "https://wool-near-impulse.glitch.me/movies";
const optionsGet = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}

const submit = $("#submit");
const movieList = $("#movie-list");

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
wait(1500).then(displayMovies);
function buildHTML(moviesArr) {
    let html = "";
    moviesArr.forEach((movie => {
        html += `<div class="card movie">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png" class="card-img-top" alt="...">${movie.poster}</img>
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Director: ${movie.director}<br>Rating: ${movie.rating}<br>Year: ${movie.year}<br>Movie Id: ${movie.id}</p>
                        <button class="remove-btn btn-primary" data-id="${movie.id}">DELETE</button>
                    </div>
                 </div>`
    }));
    return html
}
function displayMovies() {
    fetch(url, optionsGet)
        .then(response => response.json())
        .then(movies => {
            let html = buildHTML(movies);
            movieList.empty();
            movieList.append(html);
            getPosters();
        }).then(() => {
        $("#loading-screen").removeClass("d-block").addClass("d-none");
        $("#movies-container").removeClass("d-none").addClass("d-block");
    })
        .then(() => {
            $(".remove-btn").click(function (e) {
                e.preventDefault();
                let id = $(this).attr("data-id");
                fetch(`https://wool-near-impulse.glitch.me/movies/${id}`, {
                    method: 'DELETE'
                }).then(response => console.log(response.json()))
                    .then(displayMovies);
            })
        })
        // SORT BUTTON
        .then(() => {
            $("#sort-type").change(function (e) {
                console.log(this.value);
                let sortType = this.value;
                let selectedGenre = $("#genre-select").val().toLowerCase();
                fetch(url, optionsGet)
                    .then(response => response.json())
                    .then(movies => {
                        let sortedMovies = [];
                        if(sortType === "rating"){
                            sortedMovies = movies.sort((a, b) => a[sortType] < b[sortType] ? 1 : -1);
                        } else if (sortType === "title"){
                            sortedMovies = movies.sort((a, b) => a[sortType].toLowerCase() > b[sortType].toLowerCase() ? 1 : -1);
                        }
                        let sortedAndFilteredMovies = [];
                        if(selectedGenre === "all"){
                            let html = buildHTML(sortedMovies);
                            movieList.empty();
                            movieList.append(html);
                            getPosters();
                        } else {
                            sortedAndFilteredMovies = sortedMovies.filter(movie => {
                                return movie.genre.toLowerCase().includes(selectedGenre)
                            })
                            let html = buildHTML(sortedAndFilteredMovies);
                            movieList.empty();
                            movieList.append(html);
                            getPosters();
                        }
                    });
            });
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
                }
            }).then(displayMovies);
        });
    });
}
//-------------------------------------------------------------------------------------------------
submit.click(function (e) {
    e.preventDefault();
    let title = $('#input').val();
    let genre = $('#genre').val();
    let director = $('#director').val();
    let year = $('#year').val();
    let rating = $('#rating').val();
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            genre: genre,
            director: director,
            rating: rating,
            year: year,
            poster: ""
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
});
// --------------FILTER ID SEARCH-------------------------
//page blank after search
$("#id-edit").on("keyup",function(){
    fetch(url, optionsGet)
        .then(response => response.json())
        .then(movies => {
            let value = $(this).val()
            if(value === ""){
                displayMovies();
            } else {
                let filteredMovies = movies.filter(newMovie => {
                    return value.includes(newMovie.id)
                });
                let html = buildHTML(filteredMovies);
                movieList.html(html)
                getPosters();
            }
        })
})

// Retrieve movie posters from omdb api and apply to movie cards
function getPosters(){
    let titleTags = document.querySelectorAll("#movie-list .card-body .card-title");  // look for the h5 elems that contain the title
    for(let titleTag of titleTags){
        let movieTitle = titleTag.innerText // removes "title: "  from h5 text. leaves us with actual movie title only
        // Fetch request for movie posters through omdb api
        fetch("http://www.omdbapi.com/?t=" + movieTitle + `&apikey=${MOVIE_KEY}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(movieData => {
                let imgTag = titleTag.parentElement.parentElement.getElementsByTagName("img")[0];
                imgTag.src = movieData.Poster;
            })
    }
}

// Show movies based on genre
$("#genre-select").change(function(){
    fetch(url, optionsGet)
        .then(response => response.json())
        .then(movies => {
            let selectedGenre = $(this).val().toLowerCase();
            if(selectedGenre === "all"){
                displayMovies();
            } else {
                let filteredMovies = movies.filter(movie => {
                    return movie.genre.toLowerCase().includes(selectedGenre)
                });
                let html = buildHTML(filteredMovies);
                movieList.html(html)
                getPosters();
            }
        })
})


const slider = document.querySelector(".slider");
let activeIndex = 0; // the current page on the slider

// Scroll Left button
$("#moveLeft").on("click", (e) => {
    let movieWidth = document.querySelector(".movie").getBoundingClientRect()
        .width;
    let scrollDistance = movieWidth * 5; // Scroll the length of 6 movies.
    slider.scrollBy({
        top: 0,
        left: -scrollDistance,
        behavior: "smooth",
    });
    activeIndex = (activeIndex - 1) % 3;
});

// Scroll Right button
$("#moveRight").on("click", (e) => {
    let movieWidth = document.querySelector(".movie").getBoundingClientRect()
        .width;
    let scrollDistance = movieWidth * 5; // Scroll the length of 6 movies.
    slider.scrollBy({
        top: 0,
        left: +scrollDistance,
        behavior: "smooth",
    });
    activeIndex = (activeIndex + 1) % 3;
});
