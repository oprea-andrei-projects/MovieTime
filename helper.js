let mainArea = document.querySelector(".displayArea");

let textInput = document.querySelector(".search");

let buton = document.querySelector(".searchBtn");

let myModal = document.querySelector(".modal");

function getMovies(nume){

    fetch(`https://www.omdbapi.com/?s=${nume}&apikey=3c08c583`)
    .then(data=>data.json())
    .then(data=>data.Search)
    .then(data=>{

        for(let i=0; i<data.length; i++){

            let card=document.createElement('div');
            card.classList.add('card');

            card.innerHTML=`

                <img src=${data[i].Poster} class="moviePoster">
                <p class="movieTitle">${data[i].Title}</p>
            
            `
            mainArea.appendChild(card);
           


        }

     

    });
}

function clear(){
    mainArea.innerHTML = "";
}

function clearModal(){

    myModal.innerHTML = "";
}

buton.addEventListener("click", (e)=>{

    clear();

    getMovies(textInput.value);


});



function getImbdId(nume, titlu){

    

    fetch(`https://www.omdbapi.com/?s=${nume}&apikey=3c08c583`)
    .then(data=>data.json())
    .then(data=>data.Search)
    .then(data=>{

        

        for(let i=0; i<data.length; i++){

            if(data[i].Title == titlu){


                
                fetch(`http://www.omdbapi.com/?i=${data[i].imdbID}&apikey=3c08c583`)
                .then(data=>data.json())
                .then(data=>{
            
                    let card=document.createElement('div');
                    card.classList.add('zoomCard');
                    let ce =document.createElement('svg');
                    ce.classList.add('closing');
            
                    card.innerHTML=`


            
                        <img src=${data.Poster} class="moviePoster">
                        <p class="movieTitle">${data.Title}</p>

                        <ul class="details">

                            <li>${data.Released}</li>
                            <li>${data.Genre}</li>
                            <li>${data.Director}</li>
                            <li>${data.Writer}</li>
                            <li>${data.Language}</li>
                            <li>${data.Country}</li>

                        </ul>
                      
                    
                    `
                    

                    myModal.appendChild(card);
                    myModal.appendChild(ce);

                   
            
            
            
                });
            

            }
           
        }
        
      
        
        
    });

}



mainArea.addEventListener("click",(e)=>{

    let obj = e.target;
   
    if(obj.classList.contains("moviePoster")){

        let myTitle = obj.nextElementSibling.innerText;
     
       getImbdId(textInput.value,myTitle);

        myModal.style.display = "block";

    }
});


myModal.addEventListener("click", (e)=>{

    let obj  = e.target;

    if(obj.classList.contains("closing")){

        

        myModal.style.display = "none";

        clearModal();

      

       

    }



})