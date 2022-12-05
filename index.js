/* Categories definition */

const category1 = "comedy"
const category2 = "thriller"
const category3 = "history"

/* Definition of each category url */

const urlBestAll = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7"
const urlBestGenre1= "http://localhost:8000/api/v1/titles/?genre="+category1+"&sort_by=-imdb_score&page_size=7"
const urlBestGenre2 = "http://localhost:8000/api/v1/titles/?genre="+category2+"&sort_by=-imdb_score&page_size=7"
const urlBestGenre3 = "http://localhost:8000/api/v1/titles/?genre="+category3+"&sort_by=-imdb_score&page_size=7"
const categoriesUrl = [urlBestAll, urlBestGenre1, urlBestGenre2, urlBestGenre3]

/* Function to collect movies information of a category */

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

/* Function to collect movie information */

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
        movieInfo['box_office_result'] = datas.worldwide_gross_income;
        movieInfo['description'] = datas.description;
        return movieInfo;
    })
}

/* Function to create a modal with movie information */

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
    modalInfoList.children[0].appendChild(document.createElement('strong')).innerText = "Genre(s) du film: "
    modalInfoList.children[0].setAttribute('class', 'genres')
    modalInfoList.children[1].appendChild(document.createElement('strong')).innerText = "Date de sortie: "
    modalInfoList.children[1].setAttribute('class', 'date_published')
    modalInfoList.children[2].appendChild(document.createElement('strong')).innerText = "Rated: "
    modalInfoList.children[2].setAttribute('class', 'rated')
    modalInfoList.children[3].appendChild(document.createElement('strong')).innerText = "Imdb score: "
    modalInfoList.children[3].setAttribute('class', 'imdb_score')
    modalInfoList.children[4].appendChild(document.createElement('strong')).innerText = "Réalisateur(s): "
    modalInfoList.children[4].setAttribute('class', 'directors')
    modalInfoList.children[5].appendChild(document.createElement('strong')).innerText = "Acteur(s): "
    modalInfoList.children[5].setAttribute('class', 'actors')
    modalInfoList.children[6].appendChild(document.createElement('strong')).innerText = "Durée (min): "
    modalInfoList.children[6].setAttribute('class', 'duration')
    modalInfoList.children[7].appendChild(document.createElement('strong')).innerText = "Pays d'origine: "
    modalInfoList.children[7].setAttribute('class', 'countries')
    modalInfoList.children[8].appendChild(document.createElement('strong')).innerText = "Box-office: "
    modalInfoList.children[8].setAttribute('class', 'box_office_result')
    modalInfoList.children[9].appendChild(document.createElement('strong')).innerText = "Description: "
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

const sliders = document.querySelectorAll('.slider')

/* Loop on urls of categories :
- collect url of each category film
- collect movie information for each movie url
- from movie information, display movie image in the carousel and create its modal */

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

/* Scroll management of carousels */

const prevBtns = document.querySelectorAll('.left-handle')
const nextBtns = document.querySelectorAll('.right-handle')

prevBtns.forEach((prevBtn) => {
    prevBtn.addEventListener("click", e => {
        const slider = prevBtn.parentElement.querySelector('.slider')
        console.log(slider)
        const cards = Array.from(slider.children)
        console.log(cards)
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))
        console.log(sliderIndex)
    
        var firstItem = slider.querySelector('.first-item')
        console.log(firstItem)
        var indexFirstItem = cards.indexOf(firstItem)
        console.log(indexFirstItem)
        var lastItem = slider.querySelector('.last-item')
        console.log(lastItem)
        var indexLastItem = cards.indexOf(lastItem)
        console.log(indexLastItem)
    
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

nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener("click", e => {
        const slider = nextBtn.parentElement.querySelector('.slider')
        const cards = Array.from(slider.children)
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))
        
        var firstItem = slider.querySelector('.first-item')
        var indexFirstItem = cards.indexOf(firstItem)
        var lastItem = slider.querySelector('.last-item')
        var indexLastItem = cards.indexOf(lastItem)
        
        if (firstItem != cards[3] ) {
        slider.style.setProperty("--slider-index", sliderIndex + 1)
        firstItem.classList.remove('first-item')
        firstItem = cards[indexFirstItem + 1]
        console.log(firstItem)
        firstItem.classList.add('first-item')
        lastItem.classList.remove('last-item')
        console.log(lastItem)
        lastItem = cards[indexLastItem + 1]
        lastItem.classList.add('last-item')
        }
    })
})


/* best movie modal management */

const overlay = document.getElementById('overlay')

const infoBtn = document.querySelector('.button-info')

infoBtn.addEventListener('click', (event) => {
    const bestModalMovie = document.querySelector('.best-movie').lastElementChild
    const closeBtnModal = bestModalMovie.querySelector('button')
    bestModalMovie.style.display = "flex"
    bestModalMovie.classList.add('active')
    overlay.classList.add('active')
    closeBtnModal.addEventListener('click', () => closeModal(closeBtnModal, bestModalMovie))
})

/* carousels modals management */

const carousels = document.querySelectorAll(".slider")

carousels.forEach((carousel) => {
    carousel.addEventListener('click', (event) => {
        const numItemSelected = event.composedPath()[1].getAttribute('class').split(" ")[1]
        const categorySelected = event.composedPath()[4]
        const classNeeded = ".modal." + numItemSelected
        const modalMovie = categorySelected.querySelector(classNeeded)
        const closeBtnModal = modalMovie.querySelector('button')
        modalMovie.style.display = "flex"
        modalMovie.classList.add('active')
        overlay.classList.add('active')
        closeBtnModal.addEventListener('click', () => closeModal(closeBtnModal, modalMovie))
    })
})

const closeModal = function(bouton, modal) {
    overlay.classList.remove('active')
    modal.style.display = "none"
    modalMovie.classList.remove('active')
    bouton.removeEventListener('click', () => closeModal(bouton, modal))
}

/* Fixed header management */

window.onscroll = function() {myFunction()};

var header = document.querySelector(".header");

var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


