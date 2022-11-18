const urlBestAll = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7"
const urlBestGenre1= "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7"
const urlBestGenre2 = "http://localhost:8000/api/v1/titles/?genre=thriller&sort_by=-imdb_score&page_size=7"
const urlBestGenre3 = "http://localhost:8000/api/v1/titles/?genre=history&sort_by=-imdb_score&page_size=7"
const categoriesUrl = [urlBestAll, urlBestGenre1, urlBestGenre2, urlBestGenre3]

/* Récupérer les informations d'un film */

const getMoviesUrl = async function (categorieUrl) {
    return fetch(categorieUrl)
    .then(function (response) {
        if (response.ok) {
            return response.json()
        }
    })
    .then(function(datas) {
        const moviesUrl = datas.results.map((data) => data.url)
        return moviesUrl
    })
}

const getMovieInfo = async function (movieUrl) {
    return fetch(movieUrl)
    .then(function (response) {
        if (response.ok) {
            return response.json()
        }
    })
    .then(function(datas) {
        let movieInfo = {};
        movieInfo['image_url'] = datas.image_url;
        movieInfo['title'] = datas.title;
        movieInfo['genres'] = datas.genres;
        movieInfo['date_published'] = datas.date_published;
        movieInfo['rated'] = datas.rated;
        movieInfo['imdb_score'] = datas.imdb_score;
        movieInfo['directors'] = datas.directors;
        movieInfo['actors'] = datas.actors;
        movieInfo['duration'] = datas.duration;
        movieInfo['countries'] = datas.countries;
        movieInfo['box_office_result'] = datas.reviews_from_users;
        movieInfo['description'] = datas.description;
        return movieInfo;
    })
}

/* Afficher les résultats d'un film dans une modal */

const createMovieModal = async function(movieInfo, index) {
    const movieModal = document.createElement('div')
    movieModal.setAttribute('class', 'modal item-' + index)
    const movieModalList = document.createElement('ul')
    for (let i=0; i < 12; i++) {
        let element = document.createElement('li')
        movieModalList.appendChild(element)
    }
    movieModalList.children[0].setAttribute('class', 'image_url')
    movieModalList.children[1].innerText = "Titre du film: "
    movieModalList.children[1].setAttribute('class', 'title')
    movieModalList.children[2].innerText = "Genre du film: "
    movieModalList.children[2].setAttribute('class', 'genres')
    movieModalList.children[3].innerText = "Date de sortie: "
    movieModalList.children[3].setAttribute('class', 'date_published')
    movieModalList.children[4].innerText = "Rated: "
    movieModalList.children[4].setAttribute('class', 'rated')
    movieModalList.children[5].innerText = "Imdb score: "
    movieModalList.children[5].setAttribute('class', 'imdb_score')
    movieModalList.children[6].innerText = "Réalisateurs: "
    movieModalList.children[6].setAttribute('class', 'directors')
    movieModalList.children[7].innerText = "Acteurs: "
    movieModalList.children[7].setAttribute('class', 'actors')
    movieModalList.children[8].innerText = "Durée: "
    movieModalList.children[8].setAttribute('class', 'duration')
    movieModalList.children[9].innerText = "Pays d'origine: "
    movieModalList.children[9].setAttribute('class', 'countries')
    movieModalList.children[10].innerText = "Box-office: "
    movieModalList.children[10].setAttribute('class', 'box_office_result')
    movieModalList.children[11].innerText = "Description: "
    movieModalList.children[11].setAttribute('class', 'description')
    movieModal.appendChild(movieModalList)
    for (key in movieInfo) {
        const info = movieInfo[key]
        const liBalise = movieModalList.querySelector('.'+key)
        if (key == 'image_url') {
            let movieImage = new Image();
            movieImage.src = info;
            movieImage.setAttribute('class','movie-modal')
            liBalise.appendChild(movieImage);
        } else {
            const spanBalise = document.createElement('span')
            spanBalise.innerText = info
            liBalise.appendChild(spanBalise)
            movieModalList.appendChild(liBalise)
        }
    }
    const modalButton = document.createElement('button')
    modalButton.innerText = "Fermer"
    movieModal.appendChild(modalButton)
    return movieModal
}

getMovieInfo("http://localhost:8000/api/v1/titles/1508669")
.then((movieInfo) => createMovieModal(movieInfo))

/* fonction pour récupérer l'image de chaque film d'une catégorie */
const getMoviesUrlImage = async function(url){
    return fetch(url)
    .then(function (response) {
        if (response.ok) {
            return response.json()
        }
    })
    .then(function (datas) {
        const moviesUrlImage = datas.results.map((data) => data.image_url)
        return moviesUrlImage
        })
    .catch(function(err) {
        console.log(err);
    });
}

const sliders = document.querySelectorAll('.slider')

/* Parcourir chaque catégorie, récupérer l'url de chaque film
Pour chaque url de film, récupérer les informations
Pour chaque movie info, je dois créer la balise img + la modal */

categoriesUrl.forEach(async (url, index) => {
    const moviesUrl = await getMoviesUrl(url)
    if (index == 0){
        const bestMovieInfo = await getMovieInfo(moviesUrl[0])
        const bestMovieSection = document.querySelector('.top-film')
        bestMovieSection.style.setProperty("background-image", 'url(' + bestMovieInfo.image_url +')')
    }
    const slider = sliders[index]
    moviesUrl.forEach(async (movieUrl, index) => {
        const movieInfo = await getMovieInfo(movieUrl)
        let img = new Image();
        img.src = movieInfo.image_url;
        const liBalise = slider.children[index]
        const divCategory = slider.parentElement.parentElement
        const movieModal = await createMovieModal(movieInfo, index+1)
        liBalise.appendChild(img)
        divCategory.appendChild(movieModal)
    })
})

/* Gestion du défilement des carousels */

const prevBtns = document.querySelectorAll('.left-handle')
const nextBtns = document.querySelectorAll('.right-handle')
const slider = document.querySelector('.slider')
const cards = Array.from(slider.children)

prevBtns.forEach((prevBtn) => {
    prevBtn.addEventListener("click", e => {
        const slider = prevBtn.parentElement.querySelector('.slider')
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))
    
        var firstItem = document.querySelector('.first-item')
        var indexFirstItem = cards.indexOf(firstItem)
        var lastItem = document.querySelector('.last-item')
        var indexLastItem = cards.indexOf(lastItem)
    
        if (lastItem != cards[6] ) {
        slider.style.setProperty("--slider-index", sliderIndex + 1)
        firstItem.classList.remove('first-item')
        firstItem = cards[indexFirstItem + 1]
        firstItem.classList.add('first-item')
        lastItem.classList.remove('last-item')
        lastItem = cards[indexLastItem + 1]
        lastItem.classList.add('last-item')
        }
    })
})

nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener("click", e => {
        const slider = nextBtn.parentElement.querySelector('.slider')
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))
        
        var firstItem = document.querySelector('.first-item')
        var indexFirstItem = cards.indexOf(firstItem)
        var lastItem = document.querySelector('.last-item')
        var indexLastItem = cards.indexOf(lastItem)
        
        if (firstItem != cards[0] ) {
        slider.style.setProperty("--slider-index", sliderIndex - 1)
        firstItem.classList.remove('first-item')
        firstItem = cards[indexFirstItem - 1]
        firstItem.classList.add('first-item')
        lastItem.classList.remove('last-item')
        lastItem = cards[indexLastItem - 1]
        lastItem.classList.add('last-item')
        }
    })
})

/* gestion modal top film 

openBtnModal.onclick = function () {
    modal.style.display = "block";
}

closeBtnModal.onclick = function () {
    modal.style.display = "none";
}*/


/* gestion modals carousel */

const carousels = document.querySelectorAll(".slider")

carousels.forEach((carousel) => {
    carousel.addEventListener('click', (event) => {
        const numItemSelected = event.composedPath()[1].getAttribute('class').split(" ")[1]
        const categorySelected = event.composedPath()[4]
        const classNeeded = ".modal." + numItemSelected
        const modalMovie = categorySelected.querySelector(classNeeded)
        const closeBtnModal = modalMovie.querySelector('button')
        modalMovie.style.display = "flex"
        closeBtnModal.addEventListener('click', () => closeModal(closeBtnModal, modalMovie))
    })
})

const closeModal = function(bouton, modal) {
    modal.style.display = "none"
    bouton.removeEventListener('click', () => closeModal(bouton, modal))
}

