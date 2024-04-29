const BOOK_API_BASE_URL = 'https://openlibrary.org/';

const bookInput = document.querySelector (".book-input");
const searchButton = document.querySelector (".search-btn");

const createSearchBox = (bookName, bookItem, index) => {
    if (index === 0) {
        return `<div class="details">
                    <h2>${bookName} (${bookItem.title.split(" ")[0]})</h2>
                    <h4>Author: ${(bookItem.author_name - " ")}</h4>
                    <h4>Published Year: ${bookItem.first_publish_year}</h4>
                    <h4>Isbn: ${bookItem.isbn}</h4>
                </div>`
                //<div class="icon">
                    // <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    // <h4>${weatherItem.weather[0].description}</h4>
                 //</div>;
    }
}

const generateResults = (data) => {
    data.forEach((bookItem, index) => {
        const bookTitle = bookItem.title;
        console.log(bookTitle)
        const bookAuthor = bookItem.author_name[0];
        console.log(bookAuthor)
        const bookPublished = bookItem.first_publish_year;
        console.log(bookPublished)
        const bookIsbn = bookItem.isbn[0];
        console.log(bookIsbn)
        const bookCoverImage = bookItem.cover_i;
        console.log(bookCoverImage)
    });
}

const getSearchDetails = (bookName) => {
    var apiUrl = `${BOOK_API_BASE_URL}search.json?q=${bookName}`
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => 
        generateResults(data.docs)
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
