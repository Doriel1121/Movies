import logo from "./logo.svg";
import "./styles/style.css";
import axios from "axios";
import Movies from "./components/MoviesPage";
import $ from "jquery";

function App() {
  return (
    <div className="App">
      <Movies />
    </div>
  );
}

export default App;
