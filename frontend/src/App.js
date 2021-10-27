import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {

  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

export default App;
