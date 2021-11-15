import styled from "styled-components";

export const ModalScreen = styled.div`
    background-color: rgb(0, 0, 0, 0.5);
    position: fixed;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
`

export const ModalContainer = styled.div`
    width: min(300px, 80vw);
    height: min(250px, 50vh);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    border-radius: 20px;
    padding: 15px 25px;
`

export const ButtonsContainer = styled.div`
    display: flex;
    width: 80%;
    padding: 5px 10px;
    justify-content: space-between;
`