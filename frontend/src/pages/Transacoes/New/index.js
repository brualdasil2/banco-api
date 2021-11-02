import { useContext, useState } from "react"
import { ScreenContainer } from "../../Login/styles"
import { AuthContext } from "../../../contexts/AuthContext"
import Input from "../../../components/Input"



export default function NewTransfer() {

    const [user, setUser] = useContext(AuthContext)
    const [destino, setDestino] = useState("")
    const [valor, setValor] = useState("R$ 0,00")
    const [valorNums, setValorNums] = useState("")

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
                        console.log(tempValorNums)
                        const formattedValorNums = formatValorNums(tempValorNums)
                        setValor(`R$ ${formattedValorNums}`)
                        setValorNums(tempValorNums)
                    }
                }
            }
        }
    }

    return (
        <ScreenContainer>
            <Input label="Usuário destino" onChange={(e) => {setDestino(e.target.value)}}/>
            <Input value={valor} label="Valor a transferir" onChange={(e) => {handleValueUpdate(e.target.value)}}/>
        </ScreenContainer>
    )
}