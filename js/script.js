const searchMovie = document.getElementById('search')
let inputValue = document.getElementById('enter-movie')
searchMovie.addEventListener('click',function(){
    let searchedValue = inputValue.value
    fetch(`https://www.omdbapi.com/?apikey=55ea45d4&s=${searchedValue}`)
    .then(res=>res.json())
    .then(data =>{
        for(let i=0;i<data.Search.length;i++){
            fetch(`https://www.omdbapi.com/?apikey=55ea45d4&i=${data.Search[i].imdbID}`)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
            })
            
        }
        
    })
})

