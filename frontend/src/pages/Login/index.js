import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { AuthContext } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { ErrorMsg, LoginForm, ScreenContainer } from "./styles"

function Login() {
    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")
    const [loginMsg, setLoginMsg] = useState("")
    const [user, setUser] = useContext(AuthContext)
    const history = useHistory()

    async function sendLogin(e) {
        e.preventDefault()
        try {
            const res = await api.post("/login", {
                login,
                senha
            })
            const token = res.data.token
            setUser({token, login})
            history.push("/")
        }
        catch (e){
            if (e.response) {
                setLoginMsg(e.response.data.message)
            }
            else {
                setLoginMsg("Servidor não encontrado!")
            }

        }
    }

    return (
        <ScreenContainer>
            <LoginForm onSubmit={(e) => sendLogin(e)}>
                <input onChange={(e) => setLogin(e.target.value)} placeholder="Login"></input>
                <input onChange={(e) => setSenha(e.target.value)} placeholder="Senha"></input>
                <button type="submit">Enviar</button>
            </LoginForm>
            <ErrorMsg>{loginMsg}</ErrorMsg>
        </ScreenContainer>
    )
}

export default Login