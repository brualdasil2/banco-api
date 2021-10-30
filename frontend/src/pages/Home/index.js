import { useContext, useEffect, useState } from "react"
import { Redirect } from "react-router"
import MenuButton from "../../components/MenuButton"
import { AuthContext } from "../../contexts/AuthContext"
import { api } from "../../services/api"

function Home() {
    const [user] = useContext(AuthContext)
    const [nome, setNome] = useState("")

    useEffect(async() => {
        try {
            const res = await api.get(`/users/${user.login}?token=${user.token}`)
            setNome(res.data.nome)
        }
        catch (e){
            if (e.response) {
                console.log(e.response.data.message)
            }
            else {
                console.log("Servidor não encontrado!")
            }
        }
    })

    return (
        <div>
            <h1>HOME</h1>
            <h3>Bem-vindo, {nome}!</h3>
            <MenuButton destination="/perfil">Perfil</MenuButton>
            <MenuButton destination="/transacoes">Transferências</MenuButton>
        </div>
    )
}

export default Home