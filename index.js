const urlBestAll = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7"
const urlBestGenre1= "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7"
const urlBestGenre2 = "http://localhost:8000/api/v1/titles/?genre=thriller&sort_by=-imdb_score&page_size=7"
const urlBestGenre3 = "http://localhost:8000/api/v1/titles/?genre=history&sort_by=-imdb_score&page_size=7"
const categoriesUrl = [urlBestAll, urlBestGenre1, urlBestGenre2, urlBestGenre3]

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

/* Récupérer les images de chaque catégorie */
categoriesUrl.forEach(async (url, index) => {
    const moviesUrlImage = await getMoviesUrlImage(url)
    const slider = sliders[index]
    moviesUrlImage.forEach((urlImage, index) => {
        let img = new Image();
        img.src = urlImage;
        slider.children[index].appendChild(img);
    })
})


/*sliders.forEach((slider) => {
    const sliderItems = slider.children;
    return sliderItems;
})
.then((datas))*/

/* Boucler sur chaque url catégorie et lancer la fonction de récupération des images */



/* Classe pour initialiser un carousel 
- Données d'entrée: */

/*class Carousel {
    constructor(nb_elements) {
        this.slider = "";
        this.createSlider();
        this.nb_elements = nb_elements;
    }

    createSlider() {
        this.slider = document.createElement('ul')
        this.slider.setAttribute('class', 'slider slider-one')
    }

    createItems(u) {
        let item = document.createElement('li')
        item.setAttribute('class', 'carousel-item item-1')
        this.slider.appendChild(item)
    }
}

var firstCarousel = new Carousel(2);
firstCarousel.createSlider();
console.log(firstCarousel.slider)
firstCarousel.createItem();
console.log(firstCarousel.slider.children)*/

/* Fonction pour créer un carousel de 7 films */

/* const createCarousel = function(moviesUrl) {
    for (let movieUrl in moviesUrl) {

    }
} */

const prevBtn = document.querySelector('.left-handle')
const nextBtn = document.querySelector('.right-handle')
const slider = document.querySelector('.slider')
const cards = Array.from(slider.children)

prevBtn.addEventListener("click", e => {
    const slider = document.querySelector(".slider")
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

nextBtn.addEventListener("click", e => {
    const slider = document.querySelector(".slider")
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

/* modal */

const openInfoBtn = document.querySelector('.open-info-top-film')
const closeInfoBtn = document.querySelector('.close-info-top-film')
const modal = document.querySelector('.modal-top-film')

openInfoBtn.onclick = function () {
    modal.style.display = "block";
}

closeInfoBtn.onclick = function () {
    modal.style.display = "none";
}