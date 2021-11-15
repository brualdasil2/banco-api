import { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { SaldoContainer, TransfContainer, TransfScreenContainer } from "../Transacoes/styles";
import User from "../../components/User"
import Button from "../../components/Button"
import { useHistory } from "react-router";
import NavArrow from "../../components/NavArrow";
import { ModalContext } from "../../contexts/ModalContext";

export default function Admin() {

    const {user} = useContext(AuthContext)
    const {activateModal} = useContext(ModalContext)
    const [users, setUsers] = useState([])

    const history = useHistory()

    useEffect(async() => {
        try {
            const res = await api.get(`/users`)
            const newUsers = res.data.users
            setUsers(newUsers)
        }
        catch (e) {
            if (e.response) {
                console.log(e.response.data.message)
            }
            else {
                console.log("Servidor não encontrado!")
            }
        }
    }, [])

    async function deleteUser(u) {
        try {
            let res = await api.delete(`/users/${u.login}`)
            res = await api.get(`/users`)
            setUsers(res.data.users)
        }
        catch (e) {
            if (e.response) {
                console.log(e.response.data.message)
            }
            else {
                console.log("Servidor não encontrado!")
            }
        }
    }

    
    return (
        <>
            <NavArrow />
            
            <TransfScreenContainer>
                <h1>Administrador</h1>
                    <TransfContainer>
                    <SaldoContainer>
                        <h2>Usuários</h2>
                        <Button color="lightgreen" onClick={() => history.push("/admin/newUser")}>Novo usuário</Button>
                    </SaldoContainer>
                        {users && users.slice().reverse().map((u, index) => {
                            return (
                                <User key={index} showDelButton={u.login !== user.login} deleteFunction={() => activateModal("Deseja mesmo deletar esse usuário?", () => () => deleteUser(u))} u={u}/>
                            )
                        })}
                    </TransfContainer>
            </TransfScreenContainer>
       </>
    )
}