import { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { TransfContainer, TransfScreenContainer } from "../Transacoes/styles";
import User from "../../components/User"

export default function Admin() {

    const [user] = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [update, setUpdate] = useState(false)

    useEffect(async() => {
        try {
            const res = await api.get(`/users?token=${user.token}`)
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
            const res = await api.delete(`/users/${u.login}?token=${user.token}`)
            setUpdate(!update)
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
       <TransfScreenContainer>
           <h1>Administrador</h1>
            <TransfContainer>
                <h2>Usuários</h2>
                {users && users.slice().reverse().map((u, index) => {
                    return (
                        <User key={index} showDelButton={u.login !== user.login} deleteFunction={deleteUser} u={u}/>
                    )
                })}
            </TransfContainer>
       </TransfScreenContainer>
    )
}