const searchMovie = document.getElementById('search')

searchMovie.addEventListener('click',function(){
    console.log('clicked')
})

fetch('https://www.omdbapi.com/?apikey=55ea45d4&s=blade runner')
.then(res=>res.json())
.then(data =>{
    for(let i=0;i<data.Search.length;i++){
        console.log(data.Search[i].imdbID)
    }
    
})