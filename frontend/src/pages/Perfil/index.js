import { useContext, useState } from "react";
import Input from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { ErrorMsg, ScreenContainer } from "../Login/styles";
import { InputsContainer, VerticalInputsContainer } from "./styles";

export default function Perfil() {
    const [user, setUser] = useContext(AuthContext)
    const [idade, setIdade] = useState("")
    const [editIdade, setEditIdade] = useState(false)
    const [editSenha, setEditSenha] = useState(false)
    const [senha, setSenha] = useState("")
    const [repSenha, setRepSenha] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    async function saveIdade() {
        try {
            const res = await api.put(`/users/${user.login}?token=${user.token}`, { idade: parseInt(idade) })
            const newUser = {...user, idade}
            setUser(newUser)
            setEditIdade(false)
            setErrorMsg("")
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
    async function saveSenha() {
        try {
            const res = await api.put(`/users/${user.login}?token=${user.token}`, { senha })
            const newUser = {...user, senha}
            setUser(newUser)
            setEditSenha(false)
            setErrorMsg("")
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
        <ScreenContainer>
            <h1>Meu perfil</h1>
            <InputsContainer>
                <div>
                    <h3>Nome: {user.nome}</h3>
                    {editIdade ? (
                        <div>
                            <Input label="Idade" disabled={false} onChange={(e) => {setIdade(e.target.value)}} />
                            <button disabled={idade.length === 0} onClick={saveIdade}>Salvar</button>
                            <button onClick={() => setEditIdade(false)}>Cancelar</button>
                        </div>
                    ):(
                        <div>
                            <h3>Idade: {user.idade}</h3>
                            <button onClick={() => setEditIdade(true)}>Mudar idade</button>
                        </div>
                    )}
                </div>    
                <div>    
                    <h3>Login: {user.login}</h3>
                    {editSenha ? (
                        <div>
                            <VerticalInputsContainer>
                                <Input type="password" label="Nova senha" disabled={false} onChange={(e) => {setSenha(e.target.value)}} />
                                <Input type="password" label="Confirme a senha" disabled={false} onChange={(e) => {setRepSenha(e.target.value)}} />
                            </VerticalInputsContainer>
                            <button disabled={senha !== repSenha || senha.length === 0} onClick={saveSenha}>Salvar senha</button>
                            <button onClick={() => setEditSenha(false)}>Cancelar</button>
                        </div>
                    ):(
                        <button onClick={() => setEditSenha(true)}>Mudar senha</button>
                    )}
                </div>    
            </InputsContainer>
            <ErrorMsg>{errorMsg}</ErrorMsg>
        </ScreenContainer>
    )
}