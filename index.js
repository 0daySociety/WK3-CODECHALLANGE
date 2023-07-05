document.addEventListener("DOMContentLoaded",intialize)
// this is the gateway of the code 
function intialize(){
    // this function fetches data from db.json 
    fetchMovies();
}

function fetchMovies(){
let url ="http://localhost:3000/films"
    fetch(url)
    .then(response=>response.json())
    .then(data=>data.forEach(element =>{
        // after fetching the data we render it to the dom
        loadMovies(element)
    }))
  
}



function loadMovies(moviesData){ 
    // i select a div in the dom to render the movies names
  let moviesSection= document.getElementById("moviesNames");

  let moviesList=document.createElement("ul");
  let listItems=document.createElement("li")
  listItems.className="btn btn-secondary"
   listItems.innerText=moviesData.title;
//   let breaker=document.createElement("<br>")
   moviesList.appendChild(listItems)
  moviesSection.appendChild(moviesList);
//   moviesSection.appendChild(breaker);
//   i added an event lister to the name of the movies so that when a user clicks on it, 
// it can render the movie's details

    moviesList.addEventListener("click",(e)=>{
    e.preventDefault();
    // i get the id of the movie and render it's specific data
    fetch(`http://localhost:3000/films/${moviesData.id}`)
    .then(response=>response.json())
    .then(data=>renderMovieDetail(data))
})
}


function renderMovieDetail(myMovie){
    // this function is for displaying the movie's details
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
    
    <button id="available" class="btn btn-warning">Available Tickets ${avaliableTickets}</button><br>
    <button id="tickets" class="btn btn-primary">Buy ticket</button>
  </div>`
  card.innerHTML=html;
  let tickets=document.getElementById("tickets");
//   in the card that i was able to render i have a button on which a user can buy  ticket
// when the button is pressed the following action takes place 
  tickets.addEventListener("click",(e)=>{
    e.preventDefault();
    //  increse the tickets sold and decrease the the tickets remaining

    avaliableTickets-=1
   let remainer =myMovie.tickets_sold;
   remainer+=1; 
  
//   i then patch the data to the db.json so that the data is saved 
    let modified ={tickets_sold:remainer}
    fetch(`http://localhost:3000/films/${myMovie.id}`,{
        method:"PATCH",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(modified)})
       .then(response=>response.json())
    //    i then render the dom with the updated value without making the dom to reload 
       .then(data=>renderMovieDetail(data)) 
    
   })

}