import { useContext, useState } from "react";
import Input from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { ErrorMsg, ScreenContainer } from "../Login/styles";
import { InputsContainer, ProfileDataContainer, VerticalInputsContainer } from "./styles";
import Button from "../../components/Button";
import NavArrow from "../../components/NavArrow";
import { Spinner } from "../../components/Spinner";
import { ModalContext } from "../../contexts/ModalContext";

export default function Perfil() {
    const {user, setUser} = useContext(AuthContext)
    const { activateModal } = useContext(ModalContext)
    const [idade, setIdade] = useState("")
    const [editIdade, setEditIdade] = useState(false)
    const [editSenha, setEditSenha] = useState(false)
    const [senha, setSenha] = useState("")
    const [repSenha, setRepSenha] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [showSpinner, setShowSpinner] = useState(false)
    

    async function saveIdade() {
        setShowSpinner(true)
        try {
            const res = await api.put(`/users/${user.login}`, { idade: parseInt(idade) })
            setShowSpinner(false)
            const newUser = {...user, idade}
            setUser(newUser)
            setEditIdade(false)
            setErrorMsg("")
        }
        catch (e) {
            setShowSpinner(false)
            if (e.response) {
                setErrorMsg(e.response.data.message)
            }
            else {
                setErrorMsg("Servidor não encontrado!")
            }
        }
    }   
    async function saveSenha() {
        setShowSpinner(true)
        try {
            const res = await api.put(`/users/${user.login}`, { senha })
            setShowSpinner(false)
            const newUser = {...user, senha}
            setUser(newUser)
            setEditSenha(false)
            setErrorMsg("")
        }
        catch (e) {
            setShowSpinner(false)
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
                <h1>Meu perfil</h1>
                <InputsContainer>
                    <div>
                        <h3>Nome: {user.nome}</h3>
                        {editIdade ? (
                            <div>
                                <Input label="Idade" disabled={false} onChange={(e) => {setIdade(e.target.value)}} />
                                <Button color="lightgreen" disabled={idade.length === 0} onClick={saveIdade}>Salvar</Button>
                                <Button color="red" onClick={() => setEditIdade(false)}>Cancelar</Button>
                            </div>
                        ):(
                            <div>
                                <h3>Idade: {user.idade}</h3>
                                <Button onClick={() => setEditIdade(true)}>Mudar idade</Button>
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
                                <Button color="lightgreen" disabled={senha !== repSenha || senha.length === 0} onClick={() => activateModal("Tem certeza que deseja mudar sua senha? Se você esquecê-la, será impossível de recuperá-la.", () => saveSenha)}>Salvar senha</Button>
                                <Button color="red" onClick={() => setEditSenha(false)}>Cancelar</Button>
                            </div>
                        ):(
                            <Button onClick={() => setEditSenha(true)}>Mudar senha</Button>
                        )}
                    </div>    
                </InputsContainer>
                {showSpinner && <Spinner />}
                <ErrorMsg>{errorMsg}</ErrorMsg>
            </ScreenContainer>
        </>
    )
}