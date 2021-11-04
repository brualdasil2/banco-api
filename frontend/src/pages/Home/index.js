import { useContext, useEffect, useState } from "react"
import { Redirect } from "react-router"
import MenuButton from "../../components/MenuButton"
import { AuthContext } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { ScreenContainer } from "../Login/styles"
import { ButtonContainer, HomeContainer } from "./styles"
import { BsFillPersonFill, BsGearFill } from "react-icons/bs"
import { GrMoney } from "react-icons/gr"
import { BsFillGearFill } from "react-icons/bs"
import NavArrow from "../../components/NavArrow"

function Home() {
    const [user, setUser] = useContext(AuthContext)

    useEffect(async() => {
        try {
            const res = await api.get(`/users/${user.login}?token=${user.token}`)
            const newUser = {
                login: user.login,
                token: user.token,
                admin: res.data.admin,
                idade: res.data.idade,
                nome: res.data.nome,
                saldo: res.data.saldo,
                historico: res.data.historico
            }
            console.log(newUser)
            setUser(newUser)
        }
        catch (e){
            if (e.response) {
                console.log(e.response.data.message)
            }
            else {
                console.log("Servidor não encontrado!")
            }
        }
    }, [])

    return (
        <ScreenContainer>
            <HomeContainer>
                <h1>HOME</h1>
                <h3>Bem-vindo, {user.nome}!</h3>
                <ButtonContainer>
                    <MenuButton destination="/perfil" title="Perfil">
                        <BsFillPersonFill size={50}/>
                    </MenuButton>
                    <MenuButton destination="/transacoes" title="Transações">
                        <GrMoney size={50} />
                    </MenuButton>
                    {user.admin && (
                        <MenuButton destination="/admin" title="Admin">
                            <BsGearFill size={50} />
                        </MenuButton>
                    )}
                </ButtonContainer>
            </HomeContainer>
        </ScreenContainer>
    )
}

export default Home