import { Redirect, Route } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function PrivateRoute({children, ...rest}) {
    const [user] = useContext(AuthContext)
    console.log(user)
    return (
        <Route {...rest}>
            {user.token ? (
                <>
                    {children}
                </>
            ):(
                <Redirect to="/login" />
            )}
        </Route>
    )
}