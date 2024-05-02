const addReviewHandlebar = async(event) => {
    event.preventDefault();

    const review_id = document.querySelector('input[name="isbn"]').value;
    const review_content = document.querySelector('input[name="text"]').value;

      
      if (review_content === "") {
          alert("Enter valid input");
      }else if(review_content < 30){
        alert("Enter minimun 30 characters.");
      }else {
        return;
      }

   
    const response = await fetch(`/api/review/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
           body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/review/');
      } else {
        alert(response.statusText);
      }
    
}

document.querySelector('.addReview-form').addEventListener('submit', addReviewHandlebar);