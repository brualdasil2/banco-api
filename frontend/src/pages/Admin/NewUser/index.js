import { useState } from "react/cjs/react.development";
import { ScreenContainer } from "../../Login/styles";
import Input from "../../../components/Input"
import { InputsContainer } from "./styles";
import Button from "../../../components/Button";
import { ErrorMsg } from "../../Login/styles";
import { api } from "../../../services/api";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { ModalContext } from "../../../contexts/ModalContext"
import NavArrow from "../../../components/NavArrow";

export default function NewUser() {

    const {user} = useContext(AuthContext)
    const {activateModal} = useContext(ModalContext)

    const [nome, setNome] = useState("")
    const [idade, setIdade] = useState("")
    const [saldo, setSaldo] = useState("R$ 0,00")
    const [admin, setAdmin] = useState(false)
    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")
    const [repSenha, setRepSenha] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const [saldoNums, setSaldoNums] = useState("")

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
            if (value.length < saldo.length) {
                let tempSaldoNums = saldoNums
                tempSaldoNums = tempSaldoNums.substr(0, tempSaldoNums.length-1)
                const formattedSaldoNums = formatValorNums(tempSaldoNums)
                setSaldo(`R$ ${formattedSaldoNums}`)
                setSaldoNums(tempSaldoNums)
            }
            else {
                const newChar = value[value.length - 1]
                if (isCharNumber(newChar)) {   
                    if (!(newChar == "0" && saldoNums.length == 0)) {
                        let tempSaldoNums = saldoNums
                        tempSaldoNums += newChar
                        const formattedSaldoNums = formatValorNums(tempSaldoNums)
                        setSaldo(`R$ ${formattedSaldoNums}`)
                        setSaldoNums(tempSaldoNums)
                    }
                }
            }
        }
    }

    async function saveUser() {
        try {
            const res = await api.post(`/users`, {
                nome: nome,
                idade: parseInt(idade),
                saldo: formatValorNumsToFloat(saldoNums),
                login: login,
                senha: senha,
                admin: admin
            })
            history.push("/admin")
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

    return (
        <>
            <NavArrow />
            <ScreenContainer>
                <InputsContainer>
                    <Input label="Nome" onChange={(e) => {setNome(e.target.value)}}/>
                    <Input label="Idade" onChange={(e) => {setIdade(e.target.value)}}/>
                    <Input value={saldo} label="Saldo inicial" onChange={(e) => handleValueUpdate(e.target.value)}/>
                    <Input label="Login" onChange={(e) => {setLogin(e.target.value)}}/>
                    <Input type="password" label="Senha" onChange={(e) => {setSenha(e.target.value)}}/>
                    <Input type="password" label="Confirme a senha" onChange={(e) => {setRepSenha(e.target.value)}} />
                    <Input label="Admin" type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)}/>
                    <Button color="lightgreen" onClick={admin ? () => activateModal("Tem certeza que deseja criar um admin? Ele poderá criar e deletar usuários a vontade, incluindo você.", () => saveUser) : saveUser} disabled={senha !== repSenha || senha.length === 0}>Criar usuário</Button>
                    <ErrorMsg>{errorMsg}</ErrorMsg>
                </InputsContainer>
            </ScreenContainer>
        </>
    )
}