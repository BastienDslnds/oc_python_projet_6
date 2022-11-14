/* Identifier le meilleur film = meilleure note Imdb

const img_top_film = document.getElementsByClassName('image-layer');
const top_film_title = document.getElementsByClassName('top-film-title');

/* Récupérer le titre, le résumé et la photo du meilleur film
fetch("http://localhost:8000/api/v1/titles/4465")
    .then(function(res) {
        console.log(res)
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        top_film_title.textContent = value.title
        img_top_film.setAttribute("src", value.image_url)
    })
    .catch(function(err) {
        // Une erreur est survenue
    });*/

const prevBtn = document.querySelector('.left-handle')
const nextBtn = document.querySelector('.right-handle')
const slider = document.querySelector('.slider')
const cards = Array.from(slider.children)
console.log(cards)

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
    console.log(firstItem)
    firstItem.classList.add('first-item')
    lastItem.classList.remove('last-item')
    lastItem = cards[indexLastItem + 1]
    lastItem.classList.add('last-item')
    console.log(lastItem)
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
    console.log(firstItem)
    firstItem.classList.add('first-item')
    lastItem.classList.remove('last-item')
    lastItem = cards[indexLastItem - 1]
    lastItem.classList.add('last-item')
    console.log(lastItem)
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