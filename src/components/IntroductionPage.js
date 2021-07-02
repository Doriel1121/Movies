import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class IntroductionPage extends Component {
  render() {
    return (
      <div className="fatherofall">
        <div className="firstpage">
          <Link to="/movie" className="Link">
            STAR WARS Info
          </Link>
          <img id="figureone" className="figures" src="./1.png" alt="img1" />
          <img id="figuretwo" className="figures" src="./2.png" alt="img1" />
          <img id="figurethree" className="figures" src="./3.png" alt="img1" />
          <img id="figurefour" className="figures" src="./4.png" alt="img1" />
          <img id="figurefive" className="figures" src="./5.png" alt="img1" />
        </div>
      </div>
    );
  }
}
