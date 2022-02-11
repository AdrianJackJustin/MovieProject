const url = "https://wool-near-impulse.glitch.me/movies";
const optionsGet = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}
fetchPut =   fetch(`https://wool-near-impulse.glitch.me/movies/${id}`, {
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
});

fetchPost = fetch(url, {
    method: 'POST',
    body: JSON.stringify({
        title: title,
        genre: genre,
        director: director
    }),
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});