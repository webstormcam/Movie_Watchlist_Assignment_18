const searchMovie = document.getElementById('search')
let inputValue = document.getElementById('enter-movie')
const placeholderArea = document.getElementById('placeholder-place')
let arrayOfFilms=[];
searchMovie.addEventListener('click',function(){
    arrayOfFilms =[];
    let searchedValue = inputValue.value
    inputValue.value =""
   
        fetch(`https://www.omdbapi.com/?apikey=55ea45d4&type=movie&s=${searchedValue}`)
        .then(res=>res.json())
       
        .then(data =>{
            if(data.Response==="False"){
                placeholderArea.innerHTML =`
                <p class="unable-text">Unable to find what you're looking for. Please try another search.</p>`
            } else{
                for(let i=0;i<data.Search.length;i++){
                    fetch(`https://www.omdbapi.com/?apikey=55ea45d4&t=${data.Search[i].Title}`)
                    .then(res=>res.json())
                    .then(data=>{
                        arrayOfFilms.push(data)
                    })
                    
                }
            }

            
           
            
        })
    
   console.log(arrayOfFilms)
})

