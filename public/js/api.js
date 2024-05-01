const BOOK_API_BASE_URL = 'https://openlibrary.org/';

const bookInput = document.querySelector (".book-input");
const searchButton = document.querySelector (".search-btn");

const createSearchBox = (bookTitle, bookAuthor, bookPublished, bookIsbn, bookCoverImage, index) => {
    if (index === 0) {
        return `<div class="current-search">
                    <h2>(${bookTitle})</h2>
                    <h4>Author: ${(bookAuthor - " ")}</h4>
                    <h4>Published Year: ${bookPublished}</h4>
                    <h4>Isbn: ${bookIsbn}</h4>
                </div>
                <div class="icon">
                    <img src="http://covers.openlibrary.org/${bookCoverImage.icon}@32x.png" alt="Book-Cover">
                </div>`;
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
        createSearchBox(bookTitle, bookAuthor, bookPublished, bookIsbn, bookCoverImage, index);
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
