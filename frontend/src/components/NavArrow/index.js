import { ArrowButton } from "./styles";
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useHistory } from "react-router";

export default function NavArrow() {

    const history = useHistory()

    return (
        <ArrowButton onClick={() => history.goBack()}>
            <AiOutlineArrowLeft size={30}/>
        </ArrowButton>
    )
}