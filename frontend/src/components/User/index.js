import {TransfWrapper } from "../Transferencia/styles"
import Button from "../Button"
import { AiFillDelete } from "react-icons/ai"
import { RiAdminFill } from "react-icons/ri"
import { api } from "../../services/api"
import { IconsWrapper } from "../../pages/Admin/styles"

export default function User({u, deleteFunction, showDelButton=true, ...rest}) {



    return (
        <TransfWrapper>
            <h3>{u.nome}</h3>
            <h3>R$ {u.saldo}</h3>
            <IconsWrapper>
                {u.admin && <RiAdminFill size={20} />}
                {showDelButton && <Button {...rest} color="white" onClick={deleteFunction}><AiFillDelete color={"red"} size={20}/></Button>}
            </IconsWrapper>
        </TransfWrapper>
    )
}