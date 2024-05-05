
const addReviewHandlebar = async(event) => {
    event.preventDefault();

    const isbn = document.querySelector('input[name="isbn"]').value;
    console.log(isbn);
    const title = document.querySelector("#book_title").innerHTML;
    console.log(title);
    const review = document.querySelector("#review_text").value;
    console.log(review);

      
        if (isbn && review) {
          console.log('Review handlers');
          const response = await fetch('/api/review', {
            method: 'POST',
            body: JSON.stringify({ title, isbn, review }),
            headers: { 'Content-Type': 'application/json' },
          });
          console.log(response);
           if (response.ok) {
            //document.location.replace('/dashboard');
            
          } else {
            console.log('Failed to create post');
          }
        }
      };




document.querySelector('.addReview-form').addEventListener('submit', addReviewHandlebar);