const category1 = "comedy"
const category2 = "thriller"
const category3 = "history"

const urlBestAll = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7"
const urlBestGenre1= "http://localhost:8000/api/v1/titles/?genre="+category1+"&sort_by=-imdb_score&page_size=7"
const urlBestGenre2 = "http://localhost:8000/api/v1/titles/?genre="+category2+"&sort_by=-imdb_score&page_size=7"
const urlBestGenre3 = "http://localhost:8000/api/v1/titles/?genre="+category3+"&sort_by=-imdb_score&page_size=7"
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
        console.log(datas)
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

const createModal = async function(movieInfo, index) {
    const modal = document.createElement('div')
    modal.setAttribute('class', 'modal item-' + index)
    const modalHeader = document.createElement('div')
    modalHeader.setAttribute('class', 'modal-header')
    modal.appendChild(modalHeader)
    const modalTitle = document.createElement('h1')
    modalTitle.setAttribute('class', 'modal-title')
    modalHeader.appendChild(modalTitle)
    const modalCloseBtn = document.createElement('button')
    modalCloseBtn.innerHTML = "&times;"
    modalCloseBtn.setAttribute('class', 'close-button')
    modalHeader.appendChild(modalCloseBtn)
    const modalBody = document.createElement('div')
    modalBody.setAttribute('class', 'modal-body')
    modal.appendChild(modalBody)
    const modalDivImg = document.createElement('div')
    modalDivImg.setAttribute('class', 'modal-box-img')
    modalBody.appendChild(modalDivImg)
    const modalInfoList = document.createElement('ul')
    modalInfoList.setAttribute('class', 'modal-list')
    modalBody.appendChild(modalInfoList)
    for (let i=1; i < 12; i++) {
        let element = document.createElement('li')
        modalInfoList.appendChild(element)
    }
    modalInfoList.children[0].innerText = "Genre du film: "
    modalInfoList.children[0].setAttribute('class', 'genres')
    modalInfoList.children[1].innerText = "Date de sortie: "
    modalInfoList.children[1].setAttribute('class', 'date_published')
    modalInfoList.children[2].innerText = "Rated: "
    modalInfoList.children[2].setAttribute('class', 'rated')
    modalInfoList.children[3].innerText = "Imdb score: "
    modalInfoList.children[3].setAttribute('class', 'imdb_score')
    modalInfoList.children[4].innerText = "Réalisateurs: "
    modalInfoList.children[4].setAttribute('class', 'directors')
    modalInfoList.children[5].innerText = "Acteurs: "
    modalInfoList.children[5].setAttribute('class', 'actors')
    modalInfoList.children[6].innerText = "Durée: "
    modalInfoList.children[6].setAttribute('class', 'duration')
    modalInfoList.children[7].innerText = "Pays d'origine: "
    modalInfoList.children[7].setAttribute('class', 'countries')
    modalInfoList.children[8].innerText = "Box-office: "
    modalInfoList.children[8].setAttribute('class', 'box_office_result')
    modalInfoList.children[9].innerText = "Description: "
    modalInfoList.children[9].setAttribute('class', 'description')
    for (key in movieInfo) {
        const info = movieInfo[key]
        const liBalise = modalInfoList.querySelector('.'+key)
        if (key == 'image_url') {
            let movieImage = new Image();
            movieImage.src = info;
            movieImage.setAttribute('class', 'modal-img')
            modalDivImg.appendChild(movieImage);
        } else if (key == 'title') {
            modalTitle.innerText = info;
        } else {
            const spanBalise = document.createElement('span')
            spanBalise.innerText = info
            liBalise.appendChild(spanBalise)
        }
    }
    return modal
}

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
        const bestMovieImage = new Image()
        bestMovieImage.src = bestMovieInfo.image_url
        bestMovieImage.setAttribute('class', 'best-movie-image')
        const bestMovieTitle = bestMovieInfo.title
        const bestMovieDescription = bestMovieInfo.description
        document.querySelector('.best-movie-container-image').appendChild(bestMovieImage)
        document.querySelector('.best-movie-title').innerText = bestMovieTitle
        document.querySelector('.best-movie-description').innerText = bestMovieDescription
        const bestMovieModal = await createModal(bestMovieInfo, index)
        document.querySelector('.best-movie').appendChild(bestMovieModal)
    }
    const slider = sliders[index]
    moviesUrl.forEach(async (movieUrl, index) => {
        const movieInfo = await getMovieInfo(movieUrl)
        let img = new Image();
        img.src = movieInfo.image_url;
        const liBalise = slider.children[index]
        const divCategory = slider.parentElement.parentElement
        const movieModal = await createModal(movieInfo, index+1)
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

/* gestion modals carousel */

const infoBtn = document.querySelector('.button-info')
const carousels = document.querySelectorAll(".slider")


/*const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.close-button')

carousels.forEach((carousel) => {
    carousel.addEventListener('click', (event) => {
        modal.style.display = "flex"
    })
})

closeButton.addEventListener('click', () => modal.style.display = "none")*/


infoBtn.addEventListener('click', (event) => {
    const bestModalMovie = document.querySelector('.best-movie').lastElementChild
    const closeBtnModal = bestModalMovie.querySelector('button')
    bestModalMovie.style.display = "flex"
    closeBtnModal.addEventListener('click', () => closeModal(closeBtnModal, bestModalMovie))
})

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

/* Fixer le header */

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.querySelector(".header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}