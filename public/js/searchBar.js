// import Axios from "axios";




$("#test").keyup(function (data) {
  search = document.getElementById("test").value
  film = [];
  $("#affichage").html('')
  axios
    .get(
      "https://api.themoviedb.org/3/search/movie?page=1&language=fr-FR&api_key=5339f946394a0136198c633aa468ac5b&query=" +
      search
    )

    .then((response) => {
      const films = response.data.results


      films.forEach(element => {
        state = 'btn-primary'

        $(".movieIn").each(function () {

          if ($(this).text() == element.id) {
            state = "btn-success"
          }
        })
        $("#affichage").append(
          `<div class="content">
            <div style="width: 18rem;">
                       <img
                         src="http://image.tmdb.org/t/p/w154/`+ element.poster_path + `"
                         alt="terrible"
                         
                       >
                       <div class="card-body">
                         <h5 class="card-title">`+ element.title + `</h5>
                         <p class="card-text">`+ element.release_date + `</p>
                         <p hidden class="card-id" >`+ element.id + `</p> 
                         <a href="#"   class="addMovie btn `+ state + `">Ajouter a la liste</a>
                         </div>
            </div>`

        );

      });
      $(".addMovie").click(function (data) {
        event.preventDefault()
        title = $(this).siblings(".card-title").text()
        movieId = $(this).siblings(".card-id").text()
        listId = $(".listId").text()
        alreadyIn = false


        $(".movieIn").each(function () {

          if ($(this).text() == movieId) {
            $(this).remove()
            alreadyIn = true
          }
        })
        movieId
        console.log(alreadyIn)
        if (alreadyIn === true) {
          axios.put('/profil/removeMovie/' + listId + '/' + movieId )
            .then(response => {
              console.log(response.data)
              $(this).toggleClass("btn-success btn-primary")

            }).catch(error => {
              console.log(error.response)
            })
          
        } else {
          axios.put('/profil/addMovie/' + listId + '/' + movieId + '/' + title)
            .then(response => {
              console.log(response.data)
              $(this).toggleClass("btn-primary btn-success")
              $(".movieInList").append(`<p class="movieIn col-6">` + movieId + `</p>`)

            }).catch(error => {
              console.log(error.response)
            })


        }







      })
    })

});

