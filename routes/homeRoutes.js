const router = require('express').Router();
const { Review, User } = require("../models");
const withAuth = require("../utils/auth");

const radomBooks = [
  {
    title: "The Great Gatsby",
  },
  {
    title: "To Kill a Mockingbird",
  },
  {
    title: "1984",
  },
  {
    title: "Pride and Prejudice",
  },
];

router.get("/", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [{ model: User }],
    });

    const reviews = reviewData.map((project) => project.get({ plain: true }));

    // pick a radnom book from the radomBooks
    const randomBook =
      radomBooks[Math.floor(Math.random() * radomBooks.length)];

    res.render("homepage", {
      reviews,
      randomBook,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json(err);
  }
});

router.get("/review-book/:isbn", withAuth, async (req, res) => {
  try {
    console.log('review');
    const isbn = req.params.isbn;

    res.render("review", {
      logged_in: true,
      isbn: isbn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/review/", async (req, res) => {
  console.log("Review:", req.query.isbn);
  try {

    const isbn = req.query.isbn;
    const title = req.query.title;
    const cover_img = req.query.cover;
    const cover_image = "http://covers.openlibrary.org/b/id/"+cover_img+"-M.jpg";
    console.log(cover_image);

    let reviewData = '';
    if(isbn != null && undefined != isbn){
     reviewData = await Review.findAll({ 
      include: [{ model: User }],
      where: { isbn: isbn}} 
    )}else{
      reviewData = await Review.findAll({ 
        include: [{ model: User }]
    })
    };
      
     
   if(reviewData != null) {
    const reviews = reviewData.map((project) => project.get({ plain: true }));
    console.log("sssss" + JSON.stringify(reviews));

    const reviewList = [];
    reviews.forEach(function(review){reviewList.push(review.review)});
    const reviewIsbn = {
      isbn: isbn,
      title: title,
      cover_img: cover_image,
      reviews: reviewList
  };

    res.render("review", {
      ...reviewIsbn,
      logged_in: req.session.logged_in,
    });
  }else {

    const reviewIsbn = {
      isbn: isbn,
      title: title,
      cover_img: cover_image
  };

    res.render("review", {
      ...reviewIsbn,
      logged_in: req.session.logged_in,
    });
    
  }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/*router.get("/review",  async (req, res) => {
  console.log("Review:", req.session.user_id);
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });

    res.render("review", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});*/

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/review");
    return;
  }

  res.render("login");
});

module.exports = router;
