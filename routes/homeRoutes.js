const router = require("express").Router();
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

router.get("/", async (req, res) => {
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

router.get("/review-book/:isbn", async (req, res) => {
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

router.get("/review/:isbn", async (req, res) => {
  try {
    const reviewData = await Review.findOne({ where: { isbn: req.body.isbn}} );
    console.log(reviewData);
    const review = reviewData.get({ plain: true });

    res.render("review", {
      ...review,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/review", withAuth, async (req, res) => {
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
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/review");
    return;
  }

  res.render("login");
});

module.exports = router;
