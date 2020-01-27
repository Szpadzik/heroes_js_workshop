/*

Linki:
- Desing
  https://www.figma.com/file/jPLrcXvnQ8bZkf5bqXmbzq/apod.nasa.gov-v2

- Prezentacja
  https://docs.google.com/presentation/d/1nwNFOBaFV-T3j3RJlYeIKSYVpP-D5dIeRn0QYweQfJc/edit?usp=sharing

API:
- 5 Losowych wpisów
  https://apodapi.herokuapp.com/api/?count=5

- Wyszukiwarka
  https://apodapi.herokuapp.com/search/?number=5&search_query=[TWOEJ_ZAPYTANIE]

Zadania:
  1. Wyświetl 5 losowych wpisów z API ↑

  2. Loading…
    Gdy wczytywane są dane, pusty ekran jest brzydki

  3. Szukajka
    Przy wpisaniu zapytania wyświetla tylko wyniki z nim związane.
    A i pamiętaj o braku wyników!

  4. Lightbox
    Klik na obrazku powoduje wyświetlenie dużego podglądu
    (pomocnicza klasa CSS ".lightbox")

  5. Więcej…
    Przycina tekst gdy jest długi i wyświetla po kliknięciu

  6 Achievement!
    Zobacz plik assets/pro-tip.jpg 

  7. Filmy
    Czasami w API lecą filmy z YouTube
    Fajnie by było je wyświetlić, nie? :)
    Zobacz przykłady na https://apodapi.herokuapp.com/

  5. Gwiazdki
    Oznaczanie ulubionych wpisów plus ich wyświetlanie
    (localStorage)
*/

const form = document.getElementById("search");
const button = document.getElementById("search_btn");

const appEl = document.getElementById("app");
const searchEl = document.getElementById("search");
let favouritesArticle = JSON.parse(localStorage.getItem("favourites"));

const app = async query => {
  let url = "https://apodapi.herokuapp.com/api/?count=5";
  if (query) {
    url =
      "https://apodapi.herokuapp.com/search/?number=5&search_query=" + query;
  }

  let apiUrl = await fetch(url);
  const data = await apiUrl.json();

  appEl.innerHTML = "";

  data.forEach(item => {
    const article = document.createElement("article");
    const header_title = document.createElement("h1");
    const newImg = createLightbox(item.url);
    const des_text = ShowMore(item.description);

    article.appendChild(newImg);
    article.appendChild(header_title);
    article.appendChild(des_text);

    header_title.innerHTML = "☆" + item.title;

    appEl.appendChild(article);
  });
};

form.addEventListener("submit", e => {
  e.preventDefault();
  let query = e.target.elements.query.value;
  app(query);
});

function createLightbox(url) {
  const img = document.createElement("img");
  img.src = url;

  img.addEventListener("click", function() {
    const img_lightbox = document.createElement("img");
    img_lightbox.src = url;
    document.body.appendChild(img_lightbox);
    img_lightbox.classList.add("lightbox");

    img_lightbox.addEventListener("click", function() {
      img_lightbox.classList.remove("lightbox");
    });
  });
  return img;
}

function ShowMore(text) {
  const element = document.createElement("p");
  element.innerHTML = text.slice(0, 120);

  let short = true;
  element.addEventListener("click", function() {
    if (short) {
      element.innerHTML = text;
      short = false;
    } else {
      element.innerHTML = text.slice(0, 120);
      short = true;
    }
  });
  return element;
}

function AddFavourite(title) {
  // let fav_article = [];

  localStorage.setItem("favourites", JSON.stringify(favouritesArticle));
}
app();
