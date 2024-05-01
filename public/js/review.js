const editReviewHandler = async(event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="review-title"]').value;
    const review_content = document.querySelector('input[name="review-body"]').value;
    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length = 1
    ];

    const response = await fetch(`/api/review/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            review_content
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

document.querySelector('edit-review-form').addEventListener('submit', editReviewHandler);