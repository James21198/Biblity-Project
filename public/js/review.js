
const addReviewHandlebar = async(event) => {
    event.preventDefault();

    const isbn = document.querySelector('input[name="isbn"]').value;
    console.log("Here I am" + isbn);
    const title = document.querySelector('input[name="book_title"]').value;
    console.log("Here I am" + title);
    const cover_img = document.querySelector('#book-cover').value;
    console.log("Here I am" + cover_img);
    const review = document.querySelector("#review_text").value;


      
        if (isbn && review) {
          console.log('Review handlers');
          const response = await fetch('/api/review', {
            method: 'POST',
            body: JSON.stringify({ title, isbn, review }),
            headers: { 'Content-Type': 'application/json' },
          });
          console.log(response);
           if (response.ok) {
            response.redirect('/review/?isbn='+isbn+'&&title='+title+'&&cover='+cover_img);
            
          } else {
            console.log('Failed to create post');
          }
        }

      };




document.querySelector('.addReview-form').addEventListener('submit', addReviewHandlebar);