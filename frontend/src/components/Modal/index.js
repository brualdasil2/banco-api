import { useContext } from "react/cjs/react.development";
import { ModalContext } from "../../contexts/ModalContext";
import Button from "../Button";
import { ButtonsContainer, ModalContainer, ModalScreen } from "./styles";
import { IoAlertCircle } from "react-icons/io5"

export function Modal() {
    const {showModal, modalText, modalFunction, deactivateModal} = useContext(ModalContext)

    return (
        <div>
            {showModal && 
                <ModalScreen>
                    <ModalContainer>
                        <IoAlertCircle color="red" size={70}/>
                        <h3>{modalText}</h3>
                        <ButtonsContainer>
                            <Button color="lightgreen" onClick={() => { modalFunction(); deactivateModal() }}>Sim</Button>
                            <Button color="red" onClick={deactivateModal}>Não</Button>
                        </ButtonsContainer>
                    </ModalContainer>
                </ModalScreen>}
            
        </div>
    )
}