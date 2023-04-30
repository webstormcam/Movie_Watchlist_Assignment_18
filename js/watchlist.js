
let storageFilms =[]
let storedMovies = JSON.parse(localStorage.getItem("movies"))
let dataDisplay = document.getElementById('data-display')



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


class ExistingFilm{
    constructor(data){
        Object.assign(this, data)
        this.watchlisted = true
        this.toggleButton ="./images/Minus-Icon.png"
        this.watchText ="Remove"
        this.watchlistChange = function(){
            if(this.watchlisted===false){
                this.watchlisted= true
                this.toggleButton = './images/Minus-Icon.png'
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


function removeMovie(movie){
    for(let i=0;i<storageFilms.length;i++){
        if(movie.imdbID === storageFilms[i].imdbID){
            storageFilms.splice(i,1)
        }
    }
   
}


if(storedMovies.length>0){
    storageFilms = storedMovies
    for(let i=0;i<storageFilms.length;i++){
        storageFilms[i] = new ExistingFilm(storageFilms[i])
    }
    displayFilms(storageFilms)
} 
