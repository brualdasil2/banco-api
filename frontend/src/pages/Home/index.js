import { useContext, useEffect, useState } from "react"
import { Redirect } from "react-router"
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
        catch (e) {
            console.log(e.response.data.message)
        }
    })

    return (
        <div>
            {user.token
                ?
                (
                    <div>
                        <h1>HOME</h1>
                        <h3>Bem-vindo, {nome}!</h3>
                    </div>
                )
                :
                (
                    <Redirect to="/login" />
                )}
        </div>
    )
}

export default Home