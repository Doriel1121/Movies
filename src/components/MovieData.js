import React, { Component } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "axios";

export default class MovieData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changedProp: [],
      characters: [],
      movieData: {},
      starships: [],
      planets: [],
      species: [],
      favorite: [],
      isFavorite: false,
    };
  }

  componentDidMount = () => {
    this.revealAllCharacters();
    this.getAllStarShips();
    this.getPlanets();
    this.getAllSpecies();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.movie[0].title !== this.props.movie[0].title) {
      this.setState({
        changedProp: this.props.movie,
        characters: [],
      });
      this.CheckSavedMovies();
      this.revealAllCharacters();
      this.getAllStarShips();
      this.getPlanets();
      this.getAllSpecies();
    }
  }

  revealAllCharacters = () => {
    this.setState({ changedProp: this.props.movie });
    this.props.movie[0].characters.map((element, index) => {
      axios
        .get(`${element}`)
        .then((res) => {
          this.setState({
            characters: [...this.state.characters, res.data.name],
            movieData: res,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  getAllStarShips = () => {
    this.props.movie[0].starships.map((element, index) => {
      axios
        .get(`${element}`)
        .then((res) => {
          this.setState({
            starships: [...this.state.starships, res.data.name],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  getPlanets = () => {
    this.props.movie[0].planets.map((element, index) => {
      axios
        .get(`${element}`)
        .then((res) => {
          this.setState({
            planets: [...this.state.planets, res.data.name],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  getAllSpecies = () => {
    this.props.movie[0].species.map((element, index) => {
      axios
        .get(`${element}`)
        .then((res) => {
          this.setState({
            species: [...this.state.species, res.data.name],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  handleButton = () => {
    localStorage.setItem(
      this.props.movie[0].episode_id,
      JSON.stringify(this.props.movie)
    );
    this.setState(
      {
        favorite: [...this.state.favorite, this.props.movie[0].episode_id],
      },
      () => {
        this.CheckSavedMovies();
      }
    );
  };

  CheckSavedMovies = () => {
    if (this.state.favorite.length > 0) {
      let checkExistence = this.state.favorite.includes(
        this.props.movie[0].episode_id
      );
      console.log(checkExistence);
      this.setState({ isFavorite: checkExistence });
    } else {
    }
  };

  render() {
    if (this.state.changedProp.length > 0) {
      var producersName = this.state.changedProp[0].producer;
      var releaseDate = this.state.changedProp[0].release_date;
      var Director = this.state.changedProp[0].director;
    }
    return (
      <div id="movieDataContainer">
        <div id="iconContainer">
          <button onClick={() => this.handleButton()} id="favoriteIcon">
            <FavoriteBorderIcon
              id="fav"
              color={this.state.isFavorite ? "primary" : "action"}
            />
          </button>
        </div>
        <b> Producer: </b>
        <br />
        {producersName}
        <br />
        <br />
        <b> Director: </b>
        <br />
        {Director}
        <br />
        <br />
        <b> Release Date: </b>
        <br />
        {releaseDate}
        <br />
        <br />
        <Accordion className="accordion">
          <AccordionSummary
            className="accSummary"
            expandIcon={<ExpandMoreIcon className="iconColor" />}
          >
            <Typography>
              <b>Characters</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {this.state.characters.map((element, index) => {
                return <span key={index}>{element} , </span>;
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="accordion">
          <AccordionSummary
            className="accSummary"
            expandIcon={<ExpandMoreIcon className="iconColor" />}
          >
            <Typography>
              <b>Starships Name</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {this.state.starships.map((element, index) => {
                return <span key={index}>{element} , </span>;
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="accordion">
          <AccordionSummary
            className="accSummary"
            expandIcon={<ExpandMoreIcon className="iconColor" />}
          >
            <Typography>
              <b>Planets</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {this.state.planets.map((element, index) => {
                return <span key={index}>{element} , </span>;
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="iconColor" />}
            className="accSummary"
          >
            <Typography>
              <b>Species</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {this.state.species.map((element, index) => {
                return <span key={index}>{element} , </span>;
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}
