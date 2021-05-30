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
      starships: [],
      planets: [],
      species: [],
      favorite: [],
      liked: false,
    };
  }

  componentDidMount = () => {
    this.getAllCharacrters();
    this.getAllStarShips();
    this.getPlanets();
    this.getAllSpecies();
    this.CheckSavedMovies();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.movie[0].episode_id !== this.props.movie[0].episode_id) {
      this.setState({
        changedProp: this.props.movie,
        characters: [],
      });
      this.CheckSavedMovies();
      this.getAllCharacrters();
      this.getAllStarShips();
      this.getPlanets();
      this.getAllSpecies();
    }
  }

  getAllCharacrters = () => {
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

  handleLikeButton = () => {
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
    var key = localStorage.getItem(this.props.movie[0].episode_id);
    if (key !== null) {
      this.setState({ liked: true });
    } else {
      this.setState({ liked: false });
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
          <button onClick={() => this.handleLikeButton()} id="favoriteIcon">
            <FavoriteBorderIcon
              id="fav"
              color={this.state.liked ? "primary" : "action"}
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
