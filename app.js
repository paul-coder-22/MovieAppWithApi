const Api_key = "api_key=08b34205c4bbd69c10c817cc3048441c";
const base_url = "https://api.themoviedb.org/3"
const Api_url = base_url + '/discover/movie?sort_by=popularity.desc&' + Api_key;
const Image_url = 'https://image.tmdb.org/t/p/w500/';
const searchUrl = base_url + '/search/movie?'+Api_key;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(Api_url);

function getMovies(url) {
    fetch(url)
        .then(response => response.json()).then(data => showMovie(data.results))

}
function showMovie(data) {

    //creating skeleton
    main.innerHTML = '';

    data.forEach(element => {
        const { title, poster_path, vote_average, overview } = element;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img class="center-fit"  src= ${Image_url + poster_path} alt= ${title}>

            <div class="movie-info">
                <h3>${title}</h3>
                <span class= ${getMovieRating(vote_average)}>${vote_average}</span>
            </div>

            <div class="overview">
                <h4>Overview</h4>
                <p>${overview}</p>
            </div>
        `

        main.appendChild(movieEl);
    });
}
function getMovieRating(rating) {
    if (rating >= 8) {
        return 'green';
    } else if (rating >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit',(ele)=>{
    ele.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(searchUrl + '&query=' + searchTerm)
    }else{
        getMovies(Api_url);
    }
})
