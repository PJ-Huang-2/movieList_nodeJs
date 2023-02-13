const express = require("express");
const app = express();
const port = 3000;

// require express-handlebars here
const exphbs = require("express-handlebars");
const movieList = require("./movies.json");

// setting template engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));

// routes setting
app.get("/", (req, res) => {
  /* const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  res.render("index", { numbers: numberList }); */

  // create a variable to store movieOne
  /*  const movieList = [
    {
      id: 1,
      title: "Jurassic World: Fallen Kingdom",
      image:
        "https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg",
    },
    {
      id: 2,
      title: "THIS IS MOVIE TITLE",
      image:
        "https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg",
    },
    {
      id: 3,
      title: "Thor: Ragnarok",
      image:
        "https://movie-list.alphacamp.io/posters/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
    },
    {
      id: 4,
      title: "Avengers: Infinity War",
      image:
        "https://movie-list.alphacamp.io/posters/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    },
    {
      id: 5,
      title: "Mission: Impossible - Fallout",
      image:
        "https://movie-list.alphacamp.io/posters/80PWnSTkygi3QWWmJ3hrAwqvLnO.jpg",
    },
    {
      id: 6,
      title: "Incredibles 2",
      image:
        "https://movie-list.alphacamp.io/posters/x1txcDXkcM65gl7w20PwYSxAYah.jpg",
    },
    {
      id: 7,
      title: "Fifty Shades Freed",
      image:
        "https://movie-list.alphacamp.io/posters/jjPJ4s3DWZZvI4vw8Xfi4Vqa1Q8.jpg",
    },
    {
      id: 8,
      title: "The First Purge",
      image:
        "https://movie-list.alphacamp.io/posters/2slvblTroiT1lY9bYLK7Amigo1k.jpg",
    },
  ]; */
  // past the movie data into 'index' partial template
  res.render("index", { movies: movieList.results });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const movies = movieList.results.filter((movie) => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase());
  });
  res.render("index", { movies: movies, keyword: keyword });
});

app.get("/movies/:movie_id", (req, res) => {
  const movie = movieList.results.find(
    (movie) => movie.id.toString() === req.params.movie_id
  );
  // console.log("req.params.movie_id", req.params.movie_id);
  res.render("show", { movie: movie });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
