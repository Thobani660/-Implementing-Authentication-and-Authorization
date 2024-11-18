import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SuperAdminDashboard from "./components/SuperAdminDeshboard";
import GeneralAdminProfile from "./components/GeneralAdminProfile";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/super-admin" component={SuperAdminDashboard} />
        <Route path="/general-admin" component={GeneralAdminProfile} />
      </Switch>
    </Router>
  );
};

export default App;
