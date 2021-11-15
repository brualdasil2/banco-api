import { createContext, useState } from "react";

export const ModalContext = createContext()

export function ModalContextProvider(props) {
    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState("")
    const [modalFunction, setModalFunction] = useState(() => {})

    function activateModal(text, func) {
        setModalText(text)
        setShowModal(true)
        setModalFunction(func)
    }

    function deactivateModal() {
        setModalText("")
        setShowModal(false)
        setModalFunction(() => {})
    }


    return (
        <ModalContext.Provider value={{showModal, modalText, modalFunction, activateModal, deactivateModal}}>
            {props.children}
        </ModalContext.Provider>
    )
}