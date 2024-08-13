const API_KEY = '51364b765ae6661336dca184c7749a3c';
const API_LANGUAGE = 'pt-br';
const BASE_URL_IMAGE = {
    original: 'https://image.tmdb.org/t/p/original', 
    small: 'https://image.tmdb.org/t/p/w500'
};

const movies = [];
const movieElement = document.getElementById('movies');

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
}

function changeButtonMenu() {
    const button = document.querySelector('.button-menu');
    const navigation = document.querySelector('.navigation');
    button.classList.toggle('active');
    navigation.classList.toggle('active');
}

function setMainMovie(movie, changeMenu = true) {
    const appImage = document.querySelector('.app_image img');
    const title = document.querySelector('.feature_movie h1');
    const description = document.querySelector('.feature_movie p');
    const info = document.querySelector('.feature_movie span');
    const rating = document.querySelector('.rating strong');
    
    title.innerHTML = movie.title;
    description.innerHTML = movie.overview;
    rating.innerHTML = movie.vote_average;
    info.innerHTML = `${movie.release} - ${movie.genre} - Movie`;
    
    appImage.setAttribute('src', movie.image.original);

    if(changeMenu){
        changeButtonMenu();
    }
}

function createButtonMovie(movieId) {
    const button = document.createElement('button');
    button.setAttribute('onclick', `setMainMovie(movies.find(movie => movie.id === '${movieId}'))`);
    button.innerHTML = '<img src="../img/icon-play-button.png">';
    return button;
}

function createImageMovie(movieImage, movieTitle) {
    const divImageMovie = document.createElement('div');
    divImageMovie.classList.add('movie_image');

    const image = document.createElement('img');
    image.setAttribute('src', movieImage);
    image.setAttribute('alt', `Imagem do filme ${movieTitle}`);
    image.setAttribute('loading', 'lazy');

    divImageMovie.appendChild(image);

    return divImageMovie;
}

function addMovieInList(movie) {
    const movieItem = document.createElement('li');
    movieItem.classList.add('movie');
    movieItem.setAttribute('id', movie.id);
    const genre = `<span>${movie.genre}</span>`;
    const title = `<strong>${movie.title}</strong>`;
    
    movieItem.innerHTML = genre + title;
    movieItem.appendChild(createButtonMovie(movie.id));
    movieItem.appendChild(createImageMovie(movie.image.small, movie.title));
    
    movieElement.appendChild(movieItem);
}

function loadMovies() {
    const LIST_MOVIES = ['tt12801262', 'tt4823776', 'tt2096673', 'tt5109280', 'tt7146812', 'tt2948372', 'tt2953050', 'tt3521164', 'tt2380307', 'tt8097030'];
    
    LIST_MOVIES.map((movie, index) => {
        fetch(getUrlMovie(movie))
            .then(response => response.json())
            .then(data => {
                const movieData = {
                    id: movie,
                    title: data.title, 
                    overview: data.overview, 
                    vote_average: data.vote_average, 
                    genre: data.genres[0]?.name || 'Desconhecido', 
                    release: data.release_date.split('-')[0], 
                    image: {
                        original: BASE_URL_IMAGE.original.concat(data.backdrop_path), 
                        small: BASE_URL_IMAGE.small.concat(data.backdrop_path)
                    }
                };
                movies.push(movieData);

                if (index === 0) {
                    setMainMovie(movieData, false);
                }
                addMovieInList(movieData);
            });
    });
}

loadMovies();
