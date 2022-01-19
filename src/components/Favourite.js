import React, { Component } from "react";

export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      currGenre: "All Genres",
      movies: [],
      currText: "",
      limit: 5,
      currPage: 1,
    };
  }

  componentDidMount() {
    let genreIds = {
      28: "Action ",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music ",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let data = JSON.parse(localStorage.getItem("movies") || "[]");

    let tempArr = [];
    data.forEach((movieObj) => {
      if (!tempArr.includes(genreIds[movieObj.genre_ids[0]])) {
        tempArr.push(genreIds[movieObj.genre_ids[0]]);
      }
    });
    tempArr.unshift("All Genres");
    this.setState({
      genres: [...tempArr],
      movies: [...data],
    });
  }

  handleGenre = (genre) => {
    this.setState({
      currGenre: genre,
    });
  };

  sortPopularityDesc = () => {
    let temp = this.state.movies;
    temp.sort(function (a, b) {
      return b.popularity - a.popularity;
    });
    this.setState({
      movies: [...temp],
    });
  };

  sortPopularityAsce = () => {
    let temp = this.state.movies;
    temp.sort(function (a, b) {
      return a.popularity - b.popularity;
    });
    this.setState({
      movies: [...temp],
    });
  };

  sortRatingDesc = () => {
    let temp = this.state.movies;
    temp.sort(function (a, b) {
      return b.vote_average - a.vote_average;
    });
    this.setState({
      movies: [...temp],
    });
  };

  sortRatingAsce = () => {
    let temp = this.state.movies;
    temp.sort(function (a, b) {
      return a.vote_average - b.vote_average;
    });
    this.setState({
      movies: [...temp],
    });
  };

  handlePageChange = (page) => {
    this.setState({
      currPage: page,
    });
  };

  handleDelete = (id) => {
    let newArr = [];
    newArr = this.state.movies.filter((movieObj) => movieObj.id !== id);
    this.setState({
      movies: [...newArr],
    });
    localStorage.setItem("movies", JSON.stringify(newArr));
  };

  render() {
    let genreIds = {
      28: "Action ",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music ",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let filterArray = [];

    if (this.state.currText === "") {
      filterArray = this.state.movies;
    } else {
      filterArray = this.state.movies.filter((movieObj) => {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase());
      });
    }

    if (this.state.currGenre !== "All Genres") {
      filterArray = this.state.movies.filter(
        (movieObj) => genreIds[movieObj.genre_ids[0]] === this.state.currGenre
      );
    }

    let pages = Math.ceil(filterArray.length / this.state.limit);
    let pagesArr = [];
    for (let i = 1; i <= pages; i++) {
      pagesArr.push(i);
    }
    let startIndex = (this.state.currPage - 1) * this.state.limit;
    let endIndex = startIndex + this.state.limit;
    filterArray = filterArray.slice(startIndex, endIndex);

    return (
      <div>
        <div className="main">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <ul className="list-group favourites-genres">
                {this.state.genres.map((genre) =>
                  this.state.currGenre === genre ? (
                    <li
                      className="list-group-item"
                      style={{
                        backgroundColor: "#3f51b5",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {genre}
                    </li>
                  ) : (
                    <li
                      className="list-group-item"
                      style={{
                        backgroundColor: "white",
                        color: "#3f51b5",
                      }}
                      onClick={() => this.handleGenre(genre)}
                    >
                      {genre}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="col-lg-9 favourites-table col-sm-12">
              <div className="row">
                <input
                  type="text"
                  className="input-group-text col"
                  placeholder="Search"
                  value={this.state.currText}
                  onChange={(e) => this.setState({ currText: e.target.value })}
                />
                <input
                  type="number"
                  className="input-group-text col"
                  placeholder="Row Count"
                  value={this.state.limit}
                  onChange={(e) => this.setState({ limit: e.target.value })}
                />
              </div>
              <div className="row">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">
                        <i
                          class="fas fa-sort-up"
                          onClick={this.sortPopularityDesc}
                        />
                        Popularity
                        <i
                          class="fas fa-sort-down"
                          onClick={this.sortPopularityAsce}
                        />
                      </th>
                      <th scope="col">
                        <i
                          class="fas fa-sort-up"
                          onClick={this.sortRatingDesc}
                        />
                        Rating
                        <i
                          class="fas fa-sort-down"
                          onClick={this.sortRatingAsce}
                        />
                      </th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterArray.map((movieObj) => (
                      <tr>
                        <td>
                          <img
                            src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                            alt={movieObj.original_title}
                            style={{ width: "5rem" }}
                          />
                          {movieObj.original_title}
                        </td>
                        <td>{genreIds[movieObj.genre_ids[0]]}</td>
                        <td>{movieObj.popularity}</td>
                        <td>{movieObj.vote_average}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => this.handleDelete(movieObj.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {pagesArr.map((page) => (
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => this.handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
