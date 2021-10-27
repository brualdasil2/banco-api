import styled from "styled-components";

export const ScreenContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: fit-content;
    width: max-content;

    input {
        margin: 10px 0px;
    }
`

export const ErrorMsg = styled.h3`
    color: red;
    font-size: 16px;
`
