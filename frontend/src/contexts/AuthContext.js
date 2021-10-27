import { createContext, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext()

export function AuthContextProvider(props) {
    const [user, setUser] = useState({})

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {props.children}
        </AuthContext.Provider>
    )
}