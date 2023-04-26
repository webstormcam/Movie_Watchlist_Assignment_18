const searchMovie = document.getElementById('search')
let inputValue = document.getElementById('enter-movie')
let dataDisplay = document.getElementById('data-display')
let groupMovieArray =[]




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
        let NoDupFilms = removeDuplicates(groupMovieArray,key)
        console.log(NoDupFilms)
        displayFilms(NoDupFilms)
        
    
    }

}






function removeDuplicates(arr,key){
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

function displayFilms(data){
let movieText =``
for(let movie of data){
let movieImage = `${movie.Poster==="N/A"?'../images/No_Image_Found.png':movie.Poster}`

movieText+=`<div class="movie-div">
<img class="movie-poster" src="${movieImage}"></img>
<div class="movie-context">
<div class="title-area"><h2>${movie.Title}</h2><img class="star" src="../images/Star_Icon.png"><p>${movie.imdbRating}</p></div>
<div class="facts-button-area"><p>${movie.Runtime}</p><p>${movie.Genre}</p></div>
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
        this.watchlistCheck = function(){
            console.log("LOL")
        }
    }
}




////Think about return all the movies in an array then checking them for pictures and placing in a image for the blank ones and also maybe catch duplicates. 
//// Put all the movies in an array and then work with the class constructor to deal with our local storage thing
