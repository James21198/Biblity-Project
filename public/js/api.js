const BOOK_API_BASE_URL = 'https://openlibrary.org/';

const bookInput = document.querySelector (".book-input");
const searchButton = document.querySelector (".search-btn");

const createSearchBox = (bookName, bookItem, index) => {
    if (index === 0) {
        return `<div class="details">
                    <h2>${bookName} (${bookItem.title.split(" ")[0]})</h2>
                    <h4>Author: ${(bookItem.main.author_name - " ")}</h4>
                    <h4>Published Year: ${bookItem.main.first_publish_year}</h4>
                    <h4>Isbn: ${bookItem.main.isbn}</h4>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h4>${weatherItem.weather[0].description}</h4>
                </div>`;
    }
}


const getSearchDetails = (bookName) => {
    var apiUrl = `${BOOK_API_BASE_URL}search.json?q=${bookName}`
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => 
        console.log(data)
    )
    .catch (() => {
        alert("An error has occurred whilst finding this search request!");
    });
}

function onClickSearch (event) {
   
    const bookName = bookInput.value.trim();
    
    if (!bookName) return;
        getSearchDetails(bookName);
}

searchButton.addEventListener ("click", onClickSearch);
