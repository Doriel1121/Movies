import axios from "axios";
import React, { PureComponent } from "react";
import Characters from "./Characters";

class MoviesPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      moviesList: [],
      sniglemoviedata: [],
    };
  }

  componentDidMount = () => {
    axios
      .get("https://swapi.dev/api/films")
      .then((res) => {
        this.setState({ moviesList: res.data.results });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  PassDataToChild = (movie) => {
    console.log(movie);
    this.setState({ sniglemoviedata: [movie] });
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
                    <a onClick={() => this.PassDataToChild(element)}>
                      {element.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="moviesExpand">
            {this.state.sniglemoviedata.length > 0 ? (
              <Characters movie={this.state.sniglemoviedata} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesPage;
