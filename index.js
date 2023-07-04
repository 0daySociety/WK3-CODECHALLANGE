document.addEventListener("DOMContentLoaded",intialize)

function intialize(){
    fetchMovies();
}

function fetchMovies(){
let url ="http://localhost:3000/films"
    fetch(url)
    .then(response=>response.json())
    .then(data=>data.forEach(element =>{
        loadMovies(element)
    }))
  
}



function loadMovies(moviesData){ 
    
  let moviesSection= document.getElementById("moviesNames");
  let moviesList=document.createElement("p");
  moviesList.innerText=moviesData.title;
  moviesSection.appendChild(moviesList);

    moviesList.addEventListener("click",(e)=>{
    e.preventDefault();
    fetch(`http://localhost:3000/films/${moviesData.id}`)
    .then(response=>response.json())
    .then(data=>renderMovieDetail(data))
})
}


function renderMovieDetail(myMovie){
  let card=document.querySelector(".card");
  let avaliableTickets=myMovie.capacity-myMovie.tickets_sold;
  let html=`  
 
   <img src=${myMovie.poster} alt="cardImg">
 
   <div class="card-body">
    <h4 class="card-title">${myMovie.title}</h4>
    <h5 id="runTime">Runtime ${myMovie.runtime} mins </h5>
    <h5>Capacity ${myMovie.capacity}</h5>
    <h5>Tickets sold ${myMovie.tickets_sold}</h5>

    <p class="card-text">${myMovie.description}</p>
    
    <a href="#"  id="available" class="btn btn-warning">Available Tickets ${avaliableTickets}</a><br>
    <a href="#"  id="tickets" class="btn btn-primary">Buy tickets</a>
  </div>`
  card.innerHTML=html;

}