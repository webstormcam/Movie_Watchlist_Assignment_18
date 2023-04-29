const searchMovie = document.getElementById('search')
let inputValue = document.getElementById('enter-movie')
let dataDisplay = document.getElementById('data-display')
let groupMovieArray =[]
let noDupFilms =[]
let enteredFilms = []
let storageFilms = JSON.parse(localStorage.getItem("movies"))




if(storageFilms){
enteredFilms = storageFilms
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
        storageFilms = JSON.parse(localStorage.getItem("movies"))

     if(storageFilms){
       for(let i =0;i<storageFilms.length;i++){
        if(storageFilms[i].imdbID===noDupFilms[i].imdbID){
            noDupFilms[i] = storageFilms[i]
        }
       }
     }
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
}


class Film{
    constructor(data){
        Object.assign(this, data)
        this.watchlisted = false
        this.toggleButton = './images/PLUS_ICON.png'
        this.watchText = "Watchlist"
       
    }
    movieThing(){
        if(this.watchlisted===false){
            this.watchlisted = true
            this.toggleButton = './images/Minus-Icon.png'
            this.watchText = "Remove"
            enteredFilms.push(this)
            window.localStorage.setItem("movies",JSON.stringify(enteredFilms))
         
        } else if(this.watchlisted===true){
          this.watchlisted = false
          this.toggleButton = './images/PLUS_ICON.png'
          this.watchText = "Watchlist"
          movieRemoval(this)
        }

      
    

      
    }
}
/// If the IMDB ID matches splice that one out and put in the one that is in local storage. Then it can be toggled.

function movieRemoval(movie){
    let element = movie
    for(let i = 0;i<enteredFilms.length;i++){
        if(element.imdbID===enteredFilms[i].imdbID){
            console.log(`${enteredFilms[i].Title} was removed`)
            enteredFilms.splice(i,1)
            localStorage.setItem("movies",JSON.stringify(enteredFilms))
           
        }
    }
}




