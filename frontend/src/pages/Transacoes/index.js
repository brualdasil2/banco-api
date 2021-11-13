import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import Transferencia from "../../components/Transferencia"
import { AuthContext } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { SaldoContainer, TransfContainer, TransfScreenContainer } from "./styles"
import Button from "../../components/Button"
import NavArrow from "../../components/NavArrow"
import { Spinner } from "../../components/Spinner"


export default function Transacoes() {
    const [showSpinner, setShowSpinner] = useState(false)
    const {user, refreshUser} = useContext(AuthContext) 
    const history = useHistory()

    useEffect(async() => {
        setShowSpinner(true)
        await refreshUser()
        setShowSpinner(false)
    }, [])

    return (
        <>
            <NavArrow />
            <TransfScreenContainer>
                <h1>Minhas transações</h1>
                <TransfContainer>
                    <SaldoContainer>
                        <h1>Saldo: {showSpinner ? <Spinner /> : `R$${user.saldo}`}</h1>
                        <Button color="lightgreen" onClick={() => history.push("/transacoes/new")}>Nova transferência</Button>
                    </SaldoContainer>
                    <h2>Histórico</h2>
                    {showSpinner ? 
                        <Spinner /> : 
                        user.historico && user.historico.slice().reverse().map((transf, index) => {
                                    return (
                                        <Transferencia key={index} transf={transf}/>
                                    )
                        })
                    }
                    
                </TransfContainer>
            </TransfScreenContainer>
        </>
    )
}