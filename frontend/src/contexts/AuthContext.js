import { createContext, useState } from "react";
import { useHistory } from "react-router";
import { api } from "../services/api";

export const AuthContext = createContext()

export function AuthContextProvider(props) {
    const [user, setUser] = useState({})

    function logoutUser() {
        setUser({})
        localStorage.removeItem("@banco-api/token")
        localStorage.removeItem("@banco-api/login")
    }

    async function refreshUser() {
        if (Object.keys(user).length > 0) {
            try {
                const res = await api.get(`/users/${user.login}`)
                const newUser = {
                    login: user.login,
                    nome: res.data.nome,
                    idade: res.data.idade,
                    saldo: res.data.saldo,
                    admin: res.data.admin,
                    historico: res.data.historico
                }
                setUser(newUser)
            }
            catch (e) {
                if (e.response) {
                    console.log(e.response.data.message)
                }
                else {
                    console.log("Servidor não encontrado!")
                }
            }
        }
    }

    async function fetchUser() {
        const login = localStorage.getItem("@banco-api/login")
        if (Object.keys(user).length === 0) {
            console.log("User did not exist, creating")
            if (login) {
                try {
                    const res = await api.get(`/users/${login}`)
                    const newUser = {
                        login: login,
                        nome: res.data.nome,
                        idade: res.data.idade,
                        saldo: res.data.saldo,
                        admin: res.data.admin,
                        historico: res.data.historico
                    }
                    setUser(newUser)
                }
                catch (e) {
                    if (e.response) {
                        console.log(e.response.data.message)
                        logoutUser()
                        return true
                    }
                    else {
                        console.log("Servidor não encontrado!")
                        logoutUser()
                        return true
                    }
                }
            }
            else {
                logoutUser()
                return true
            }
        }
        return false
    }

    return (
        <AuthContext.Provider value={{user, setUser, fetchUser, refreshUser, logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}