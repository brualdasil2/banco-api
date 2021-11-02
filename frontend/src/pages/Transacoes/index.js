import { useContext } from "react"
import { useHistory } from "react-router"
import Transferencia from "../../components/Transferencia"
import { AuthContext } from "../../contexts/AuthContext"
import { SaldoContainer, TransfContainer, TransfScreenContainer } from "./styles"


export default function Transacoes() {

    const [user, setUser] = useContext(AuthContext) 
    const history = useHistory()

    return (
        <TransfScreenContainer>
            <h1>Minhas transações</h1>
            <TransfContainer>
                <SaldoContainer>
                    <h1>Saldo: R${user.saldo}</h1>
                    <button onClick={() => history.push("/transacoes/new")}>Nova transferência</button>
                </SaldoContainer>
                <h2>Histórico</h2>
                {user.historico.slice().reverse().map((transf, index) => {
                    return (
                        <Transferencia key={index} transf={transf}/>
                    )
                })}
            </TransfContainer>
        </TransfScreenContainer>
    )
}