import axios from "axios";
import React, { PureComponent } from "react";
import MovieData from "./MovieData";

class MoviesPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      moviesList: [],
      selectedMovie: [],
    };
  }

  componentDidMount = () => {
    axios
      .get("https://swapi.dev/api/films")
      .then((res) => {
        this.setState({ moviesList: res.data.results });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeSelectedMovie = (movie) => {
    this.setState({ selectedMovie: [movie] });
  };

  render() {
    return (
      <div className="container">
        <h1 id="title">Star Wars</h1>
        <div className="main-div">
          <div className="movies">
            <h2>Movies</h2>
            <ul>
              {this.state.moviesList.map((element, index) => {
                return (
                  <li key={index}>
                    <a onClick={() => this.changeSelectedMovie(element)}>
                      {element.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="moviesExpand">
            {this.state.selectedMovie.length > 0 ? (
              <MovieData movie={this.state.selectedMovie} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesPage;
