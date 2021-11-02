import { useContext } from "react"
import Transferencia from "../../components/Transferencia"
import { AuthContext } from "../../contexts/AuthContext"
import { TransfContainer, TransfScreenContainer } from "./styles"

export default function Transacoes() {

    const [user, setUser] = useContext(AuthContext) 

    return (
        <TransfScreenContainer>
            <h1>Minhas transações</h1>
            <TransfContainer>
                <h2>Saldo: R${user.saldo}</h2>
                <h2>Histórico</h2>
                {user.historico.map((transf, index) => {
                    return (
                        <Transferencia key={index} transf={transf}/>
                    )
                })}
            </TransfContainer>
        </TransfScreenContainer>
    )
}