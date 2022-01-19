import React, { Component } from "react";
import axios from "axios";

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      pArray: [1],
      currPage: 1,
      movies: [],
      favourites: [],
    };
  }

  async componentDidMount() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=66acde153df29a8b2a7b24fff98b2b5e&language=en-US&page=${this.state.currPage}`
    );
    let data = response.data;
    this.setState({
      movies: [...data.results],
    });
  }

  changeMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=66acde153df29a8b2a7b24fff98b2b5e&language=en-US&page=${this.state.currPage}`
    );
    let data = response.data;
    this.setState({
      movies: [...data.results],
    });
  };

  handleRight = async () => {
    let tempArr = [];
    for (let i = 1; i <= this.state.pArray.length + 1; i++) {
      tempArr.push(i);
    }
    this.setState(
      {
        pArray: [...tempArr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };

  handleLeft = async () => {
    if (this.state.currPage !== 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovies
      );
    }
  };

  handleValueClick = async (value) => {
    if (value !== this.state.currPage) {
      this.setState(
        {
          currPage: value,
        },
        this.changeMovies
      );
    }
  };

  handleFavourites = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    if (this.state.favourites.includes(movie.id)) {
      oldData = oldData.filter((m) => m.id !== movie.id);
    } else {
      oldData.push(movie);
    }
    localStorage.setItem("movies", JSON.stringify(oldData));
    this.handleFavouritesState();
  };
  handleFavouritesState = () => {
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    let temp = oldData.map((movie) => movie.id);
    this.setState({
      favourites: [...temp],
    });
  };

  render() {
    return (
      <div>
        {this.state.movies.length === "" ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div
                  key={movieObj.id}
                  className="card movies-card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top movies-img"
                    alt={movieObj.original_title}
                  />
                  <h5 className="card-title movies-title">
                    {movieObj.original_title}
                  </h5>
                  <div
                    className="button-wrapper"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hover === movieObj.id && (
                      <button
                        className="btn btn-primary movies-btn"
                        onClick={() => this.handleFavourites(movieObj)}
                      >
                        {this.state.favourites.includes(movieObj.id)
                          ? "Remove from favourites"
                          : "Add to favourites"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={this.handleLeft}
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  {this.state.pArray.map((value) => (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => this.handleValueClick(value)}
                      >
                        {value}
                      </button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={this.handleRight}
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    );
  }
}
