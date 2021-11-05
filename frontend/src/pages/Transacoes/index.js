import { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import Transferencia from "../../components/Transferencia"
import { AuthContext } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { SaldoContainer, TransfContainer, TransfScreenContainer } from "./styles"
import Button from "../../components/Button"
import NavArrow from "../../components/NavArrow"


export default function Transacoes() {

    const {user, refreshUser} = useContext(AuthContext) 
    const history = useHistory()

    useEffect(async() => {
        await refreshUser()
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
                    {user.historico && user.historico.slice().reverse().map((transf, index) => {
                        return (
                            <Transferencia key={index} transf={transf}/>
                        )
                    })}
                </TransfContainer>
            </TransfScreenContainer>
        </>
    )
}