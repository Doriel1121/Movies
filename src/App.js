import "./styles/style.css";
import Movies from "./components/MoviesPage";
// import { Router, Route, Switch } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Intro from "./components/IntroductionPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Intro />
          </Route>

          <Route exact path="/movie">
            <Movies />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
