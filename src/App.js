// App.js
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import Signup from "./components/Signup";
import ProfilePage from "./components/ProfileDetails";

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/tasklist" component={TaskList} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={ProfilePage} />
        </Switch>
      </Router>
    </BrowserRouter>
  );
}

export default App;
