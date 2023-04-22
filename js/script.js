const searchMovie = document.getElementById('search')
let inputValue = document.getElementById('enter-movie')
const placeholderArea = document.getElementById('placeholder-place')
searchMovie.addEventListener('click',function(){
    let searchedValue = inputValue.value
   
        fetch(`https://www.omdbapi.com/?apikey=55ea45d4&s=${searchedValue}`)
        .then(res=>res.json())
       
        .then(data =>{
            if(data.Response==="False"){
                console.log('NAH no way bro')
            } else{
                for(let i=0;i<data.Search.length;i++){
                    fetch(`https://www.omdbapi.com/?apikey=55ea45d4&t=${data.Search[i].Title}`)
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data)
                    })
                    
                }
            }
           
            
        })
    
   
})

