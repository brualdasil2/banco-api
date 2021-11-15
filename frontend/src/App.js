import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import ErrorPage from "./pages/404"
import Transacoes from "./pages/Transacoes";
import Admin from "./pages/Admin"
import NewUser from "./pages/Admin/NewUser";
import { PrivateRoute } from "./routes/PrivateRoute";
import "./index.css"
import NewTransfer from "./pages/Transacoes/New";
import { ModalContext, ModalContextProvider } from "./contexts/ModalContext";
import { Modal } from "./components/Modal";
import { useContext } from "react/cjs/react.development";

function App() {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <Modal />
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
            <PrivateRoute exact path="/transacoes/new">
              <NewTransfer />
            </PrivateRoute>
            <PrivateRoute exact path="/admin">
              <Admin />
            </PrivateRoute>
            <PrivateRoute exact path="/admin/newUser">
              <NewUser />
            </PrivateRoute>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </Router>
      </ModalContextProvider>
    </AuthContextProvider>
  )
}

export default App;
