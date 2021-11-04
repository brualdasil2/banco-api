import { useContext, useState, useEffect } from "react"
import { ErrorMsg, ScreenContainer } from "../../Login/styles"
import { AuthContext } from "../../../contexts/AuthContext"
import Input from "../../../components/Input"
import { api } from "../../../services/api"
import { useHistory } from "react-router"
import Button from "../../../components/Button"
import NavArrow from "../../../components/NavArrow"



export default function NewTransfer() {

    const [user, setUser] = useContext(AuthContext)
    const [destino, setDestino] = useState("")
    const [valor, setValor] = useState("R$ 0,00")
    const [valorNums, setValorNums] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const history = useHistory()

    function formatValorNumsToFloat(nums) {
        let valorNumsFormatado = ""
        const nZeros = 3 - nums.length
        for (let i = 0; i < nZeros; i++) {
            valorNumsFormatado += "0"
        }
        valorNumsFormatado += nums
        return parseFloat(valorNumsFormatado.substr(0, valorNumsFormatado.length - 2) + "." + valorNumsFormatado.substr(valorNumsFormatado.length - 2, 2))
    }

    async function saveTransfer() {
        try {
            const res = await api.post(`/users/${user.login}/transfer?token=${user.token}`, {
                valor: formatValorNumsToFloat(valorNums),
                destino
            })
            history.push("/transacoes")
        }
        catch (e) {
            if (e.response) {
                setErrorMsg(e.response.data.message)
            }
            else {
                setErrorMsg("Servidor não encontrado!")
            }
        }
    }

    function isCharNumber(c) {
        return c >= '0' && c <= '9';
    }

    function formatValorNums(nums) {
        let valorNumsFormatado = ""
        const nZeros = 3 - nums.length
        for (let i = 0; i < nZeros; i++) {
            valorNumsFormatado += "0"
        }
        valorNumsFormatado += nums
        return valorNumsFormatado.substr(0, valorNumsFormatado.length - 2) + "," + valorNumsFormatado.substr(valorNumsFormatado.length - 2, 2)
    }
    
    function handleValueUpdate(value) {
        if (value.length >= 0) {
            if (value.length < valor.length) {
                let tempValorNums = valorNums
                tempValorNums = tempValorNums.substr(0, tempValorNums.length-1)
                const formattedValorNums = formatValorNums(tempValorNums)
                setValor(`R$ ${formattedValorNums}`)
                setValorNums(tempValorNums)
            }
            else {
                const newChar = value[value.length - 1]
                if (isCharNumber(newChar)) {   
                    if (!(newChar == "0" && valorNums.length == 0)) {
                        let tempValorNums = valorNums
                        tempValorNums += newChar
                        const formattedValorNums = formatValorNums(tempValorNums)
                        setValor(`R$ ${formattedValorNums}`)
                        setValorNums(tempValorNums)
                    }
                }
            }
        }
    }

    return (
        <>
            <NavArrow />
            <ScreenContainer>
                <Input label="Usuário destino" onChange={(e) => {setDestino(e.target.value)}}/>
                <Input value={valor} label="Valor a transferir" onChange={(e) => {handleValueUpdate(e.target.value)}}/>
                <Button disabled={valorNums.length === 0 || destino.length === 0} color="lightgreen" onClick={saveTransfer}>Enviar Transferência</Button>
                <ErrorMsg>{errorMsg}</ErrorMsg>
            </ScreenContainer>
        </>
    )
}