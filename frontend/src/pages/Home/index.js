import { useContext, useEffect, useState } from "react"
import { Redirect, useHistory } from "react-router"
import MenuButton from "../../components/MenuButton"
import { AuthContext } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { ScreenContainer } from "../Login/styles"
import { ButtonContainer, HomeContainer } from "./styles"
import { BsFillPersonFill, BsGearFill } from "react-icons/bs"
import { GrMoney } from "react-icons/gr"
import { BsFillGearFill } from "react-icons/bs"
import NavArrow from "../../components/NavArrow"
import Button from "../../components/Button"

function Home() {
    const {user, logoutUser} = useContext(AuthContext)

    const history = useHistory()


    return (
        <ScreenContainer>
            <Button color="red" onClick={logoutUser}>Logout</Button>
            <HomeContainer>
                <h1>HOME</h1>
                <h3>Bem-vindo, {user && user.nome}!</h3>
                <ButtonContainer>
                    <MenuButton destination="/perfil" title="Perfil">
                        <BsFillPersonFill size={50}/>
                    </MenuButton>
                    <MenuButton destination="/transacoes" title="Transações">
                        <GrMoney size={50} />
                    </MenuButton>
                    {user && user.admin && (
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