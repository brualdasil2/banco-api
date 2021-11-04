import { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import Transferencia from "../../components/Transferencia"
import { AuthContext } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { SaldoContainer, TransfContainer, TransfScreenContainer } from "./styles"
import Button from "../../components/Button"
import NavArrow from "../../components/NavArrow"


export default function Transacoes() {

    const [user, setUser] = useContext(AuthContext) 
    const history = useHistory()

    useEffect(async() => {
        try {
            const res = await api.get(`/users/${user.login}?token=${user.token}`)
            const newUser = {
                login: user.login,
                token: user.token,
                admin: res.data.admin,
                idade: res.data.idade,
                nome: res.data.nome,
                saldo: res.data.saldo,
                historico: res.data.historico
            }
            console.log(newUser)
            setUser(newUser)
        }
        catch (e){
            if (e.response) {
                console.log(e.response.data.message)
            }
            else {
                console.log("Servidor não encontrado!")
            }
        }
    }, [])

    return (
        <>
            <NavArrow />
            <TransfScreenContainer>
                <h1>Minhas transações</h1>
                <TransfContainer>
                    <SaldoContainer>
                        <h1>Saldo: R${user.saldo}</h1>
                        <Button color="lightgreen" onClick={() => history.push("/transacoes/new")}>Nova transferência</Button>
                    </SaldoContainer>
                    <h2>Histórico</h2>
                    {user.historico.slice().reverse().map((transf, index) => {
                        return (
                            <Transferencia key={index} transf={transf}/>
                        )
                    })}
                </TransfContainer>
            </TransfScreenContainer>
        </>
    )
}