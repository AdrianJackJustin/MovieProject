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
        .then(data => console.log(data));
}

displayMovies();
