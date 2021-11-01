import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import ErrorPage from "./pages/404"
import Transacoes from "./pages/Transacoes";
import { PrivateRoute } from "./routes/PrivateRoute";
import "./index.css"

function App() {

  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/perfil">
            <Perfil />
          </PrivateRoute>
          <PrivateRoute exact path="/transacoes">
            <Transacoes />
          </PrivateRoute>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

export default App;
