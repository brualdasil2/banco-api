import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { AuthContext } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { ErrorMsg, LoginForm, ScreenContainer } from "./styles"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { Spinner } from "../../components/Spinner"

function Login() {
    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")
    const [loginMsg, setLoginMsg] = useState("")
    const [showSpinner, setShowSpinner] = useState(false)
    const {user, setUser} = useContext(AuthContext)
    const history = useHistory()

    async function sendLogin(e) {
        e.preventDefault()
        setShowSpinner(true)
        try {
            const res = await api.post("/login", {
                login,
                senha
            })
            setShowSpinner(false)
            const token = res.data.token
            localStorage.setItem("@banco-api/token", token)
            localStorage.setItem("@banco-api/login", login)
            history.push("/")
        }
        catch (e){
            setShowSpinner(false)
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
                <Input label="Login" onChange={(e) => setLogin(e.target.value)}/>
                <Input label="Senha" type="password" onChange={(e) => setSenha(e.target.value)}/>
                <Button type="submit">Enviar</Button>
            </LoginForm>
            {showSpinner && <Spinner/>}
            <ErrorMsg>{loginMsg}</ErrorMsg>
        </ScreenContainer>
    )
}

export default Login