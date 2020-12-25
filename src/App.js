import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import './App.css';
import  Users  from "./views/user/user";
import SignIn from "./views/login/login";
import Home from "./views/dashboard/home";
import moment from "moment";
import "moment/locale/vi";

function App() {
  return (
    <React.StrictMode>
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/user">Users</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <SignIn />
        </Route>
      </Switch>
    </div>
  </Router>
  </React.StrictMode>
  );
}

export default App;
