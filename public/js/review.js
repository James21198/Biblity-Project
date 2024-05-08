const addReviewHandlebar = async (event) => {
  event.preventDefault();
  const isbn = document.querySelector('input[name="isbn"]').value;
  //const title = document.querySelector('input[name="book_title"]').value;
  const pTitle = document.querySelector("#pTitle").innerHTML;
  const cover_img = document.querySelector("#book-cover").value;
  const review = document.querySelector("#review_text").value;

  if (isbn && review) {
    const response = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({ pTitle, isbn, review }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert('Post posted');
      document.location.replace('review?isbn='+isbn+'&&title='+pTitle+'&&cover='+cover_img);
    } else {
      console.log("Failed to create post");
    }
  }
};

const deleteHandlerbar = async (event) => {
  const id = document.querySelector("#review_id").value;
  const isbn = document.querySelector('input[name="isbn"]').value;
  //const title = document.querySelector('input[name="book_title"]').value;
  const pTitle = document.querySelector("#pDelTitle").innerHTML;
  const cover_img = document.querySelector('input[name="book_cover"]').value;
  console.log("Delete me");
  const response = await fetch("/api/review/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    alert('Post Deleted');
    document.location.replace('review?isbn='+isbn+'&&title='+pTitle+'&&cover='+cover_img);
  } else {
    console.log("Failed to delete post");
  }
};

const addReviewFormEL = document.querySelector(".addReview-form");
if (addReviewFormEL) {
  addReviewFormEL.addEventListener("submit", addReviewHandlebar);
}

const deleteReviewEl = document.querySelector(".deleteReview-form");
if (deleteReviewEl) {
    deleteReviewEl.addEventListener("submit", deleteHandlerbar);
}
