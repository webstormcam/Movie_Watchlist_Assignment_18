
let storageFilms =[]
let storedMovies = JSON.parse(localStorage.getItem("movies"))
let dataDisplay = document.getElementById('data-display')



function displayFilms(data){
    if(storedMovies.length>0){
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
        } else{
            dataDisplay.innerHTML =` <div class="place-holder-area">
            <p class="watch-list-empty">Your watch list is looking a little empty...</p>
            <p class="add-movies"><a href="index.html"><img class="watch-list-plus" src="images/PLUS_ICON.png" alt="plus-icon">Let's add some movies!</a></p>
         </div>`
        }
    
}


class WatchListFilm{
    constructor(data){
        Object.assign(this, data)
        this.watchlisted = true
        this.toggleButton ="./images/Minus-Icon.png"
        this.watchText ="Remove"
        this.watchlistChange = function(){
            
            this.watchlisted = false
            this.toggleButton = './images/PLUS_ICON.png'
            this.watchText = "Watchlist"
            removeMovie(this)
            console.log(storageFilms)
            displayFilms(storageFilms)
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
        storageFilms[i] = new WatchListFilm(storageFilms[i])
    }
    displayFilms(storageFilms)
}  else{
    dataDisplay.innerHTML =` <div class="place-holder-area">
    <p class="watch-list-empty">Your watch list is looking a little empty...</p>
    <p class="add-movies"><a href="index.html"><img class="watch-list-plus" src="images/PLUS_ICON.png" alt="plus-icon">Let's add some movies!</a></p>
 </div>`
}
