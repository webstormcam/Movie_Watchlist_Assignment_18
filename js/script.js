const searchMovie = document.getElementById('search')
let inputValue = document.getElementById('enter-movie')
let dataDisplay = document.getElementById('data-display')
let groupMovieArray =[]
let noDupFilms =[]
let storageFilms =[]
let storedMovies = JSON.parse(localStorage.getItem("movies"))

if(storedMovies){
    storageFilms = storedMovies
}

searchMovie.addEventListener('click',function(){
    let searchedValue = inputValue.value
    inputValue.value =""
   fetchMoviesJSON(searchedValue)    
})


async function fetchMoviesJSON(searchableMovie){
    const res = await fetch(`https://www.omdbapi.com/?apikey=55ea45d4&type=movie&s=${searchableMovie}`)
    const movies = await res.json()
    if(movies.Response==="False"){
        dataDisplay.innerHTML =`
                <div id="placeholder-place" class="place-holder-area">
                <p class="unable-text">Unable to find what you're looking for. Please try another search.</p>
                </div>`
    } else{
        groupMovieArray =[]
        for(let i = 0; i<movies.Search.length;i++){
           const res = await fetch(`https://www.omdbapi.com/?apikey=55ea45d4&t=${movies.Search[i].Title}`)
           const fullMovie = await res.json()
           groupMovieArray.push(new Film(fullMovie))
        }
        let key = "Title"
         noDupFilms = removeDuplicates(groupMovieArray,key)

         if(storageFilms){
          for(let i=0;i<storageFilms.length;i++){
            for(let k=0;k<noDupFilms.length;k++){
                if(storageFilms[i].imdbID===noDupFilms[k].imdbID){
                    noDupFilms[k] = new ExistingFilm (storageFilms[i])
                }
            }
          }
         }
         /////Check for the films out of order DUHHH LOL

        displayFilms(noDupFilms)
        
    
    }

}






function removeDuplicates(arr,key){
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

function displayFilms(data){
let movieText =``
/// Creates the movies on the page. 
for(let movie of data){
let movieImage = `${movie.Poster==="N/A"?'./images/No_Image_Found.png':movie.Poster}`

movieText+=`<div class="movie-div">
<img class="movie-poster" src="${movieImage}"></img>
<div class="movie-context">
<div class="title-area"><h2>${movie.Title}</h2><img class="star" src="./images/Star_Icon.png"><p>${movie.imdbRating}</p></div>
<div class="facts-button-area"><p>${movie.Runtime}</p><p>${movie.Genre}</p><div class="watch-section"><img class="toggle-pic" src="${movie.toggleButton}"></img><button class="watchlist-button">${movie.watchText}</button></div></div>
<div class="movie-desc-section">
${movie.Plot}</div>
</div>
</div>
`
}
    dataDisplay.innerHTML = movieText
   let buttons = document.getElementsByClassName('watchlist-button')
    for(let i =0;i<buttons.length; i++ ){
        buttons[i].onclick = () =>{
            data[i].watchlistChange()
        }
    }
}


class Film{
    constructor(data){
        Object.assign(this, data)
        this.watchlisted = false
        this.toggleButton = './images/PLUS_ICON.png'
        this.watchText = "Watchlist"
        this.watchlistChange = function(){
            if(this.watchlisted===false){
                this.watchlisted= true
                this.toggleButton = './images/Minus-icon.png'
                this.watchText = "Remove"
                storageFilms.push(this)
                console.log(storageFilms)
                displayFilms(noDupFilms)
           } else{
                 this.watchlisted = false
                 this.toggleButton = './images/PLUS_ICON.png'
                 this.watchText = "Watchlist"
                 displayFilms(noDupFilms)
                removeMovie(this)
                console.log(storageFilms)
        }
        localStorage.setItem("movies",JSON.stringify(storageFilms))
        }
    }
}

class ExistingFilm{
    constructor(data){
        Object.assign(this, data)
        this.watchlisted = true
        this.toggleButton ="./images/Minus-icon.png"
        this.watchText ="Remove"
        this.watchlistChange = function(){
            if(this.watchlisted===false){
                this.watchlisted= true
                this.toggleButton = './images/Minus-icon.png'
                this.watchText = "Remove"
                storageFilms.push(this)
                console.log(storageFilms)
                displayFilms(noDupFilms)
           } else{
                 this.watchlisted = false
                 this.toggleButton = './images/PLUS_ICON.png'
                 this.watchText = "Watchlist"
                 displayFilms(noDupFilms)
                removeMovie(this)
                console.log(storageFilms)
        }
        localStorage.setItem("movies",JSON.stringify(storageFilms))
        }
    }
}
/// If the IMDB ID matches splice that one out and put in the one that is in local storage. Then it can be toggled.


function removeMovie(movie){
    for(let i=0;i<storageFilms.length;i++){
        if(movie.imdbID === storageFilms[i].imdbID){
            storageFilms.splice(i,1)
        }
    }
   
}



