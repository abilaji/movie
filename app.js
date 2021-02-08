// code untuk tombol search


// mengambil data dari api menggunakan fetch
function getMovies() {
  return fetch('http://www.omdbapi.com/?apikey=1ef012a5&s=avengers')
    .then(response => response.json()) //ubah data promese menjadi json
    .then(response => {
      const movies = response.Search;
      let cards = '';
      movies.forEach(m => cards += showCards(m));

      const movieContainer = document.querySelector('.movie-container');
      movieContainer.innerHTML = cards;


      // menampilkan show detail move
      const detailMovie = document.querySelectorAll('.modal-detail-button');
      detailMovie.forEach(btn => {
        btn.addEventListener('click', function () {
          const imdbid = this.dataset.imdbid;
          fetch('http://www.omdbapi.com/?apikey=1ef012a5&i=' + imdbid)
            .then(response => response.json())
            .then(m => {
              const detailModal = showDetail(m);
              const tamilData = document.querySelector('.modal-body');
              tamilData.innerHTML = detailModal;
            })
        });
      });
    });
};

async function tampilMovie() {
  const coba = await getMovies();
};
tampilMovie();

function showCards(m) {
  return /*html*/ `<div class="col-md-4 my-3">
                        <div class="card">
                          <img src="${m.Poster}" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <p class="card-text text-muted">${m.Year}</p>
                            <a href="" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}" style="text-transform: capitalize;">show detail</a>
                          </div>
                        </div>
                      </div>`
};

function showDetail(m) {
  return /*html*/ `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${m.Poster}" class="img-fluid" alt="">
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item">
          <h4>${m.Title} ${m.Year}</h4>
        </li>
        <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
        <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
        <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
        <li class="list-group-item"><strong>Plot : </strong> ${m.Plot}</li>
      </ul>
    </div>
  </div>
</div>`
};

// const data = fetch('http://www.omdbapi.com/?apikey=1ef012a5&s=avengers')
// .then(response => response.json());
// console.log(data);