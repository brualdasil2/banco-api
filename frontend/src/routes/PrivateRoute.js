import { Redirect, Route, useHistory } from "react-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";
import { useState } from "react/cjs/react.development";

export function PrivateRoute({children, ...rest}) {

    const {fetchUser} = useContext(AuthContext)
    const token = localStorage.getItem("@banco-api/token")
    const [redirectUser, setRedirectUser] = useState(false)


    useEffect(async() => {
        const redirectUserValue = await fetchUser()
        if (redirectUserValue) {
            setRedirectUser(true)
        }
    }, [])
    
    return (
        <Route {...rest}>
            {token && !redirectUser ? (
                <>
                    {children}
                </>
            ):(
                <Redirect to="/login" />
            )}
        </Route>
    )
}