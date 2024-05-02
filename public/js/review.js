const addReviewHandlebar = async(event) => {
    event.preventDefault();

    const review_id = document.querySelector('input[name="isbn"]').value;
    const review_content = document.querySelector('input[name="text"]').value;


    test('Checks for null values', async () => {
        await expect(review_content.validate()).rejects.toThrow('notNull');
      });
      
      if (review_content === "") {
          alert("Enter valid input");
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
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    
}

document.querySelector('.addReview-form').addEventListener('submit', addReviewHandlebar);