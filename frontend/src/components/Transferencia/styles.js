import styled  from "styled-components";

export const TransfWrapper = styled.div`
    width: min(90vw, 800px);
    height: fit-content;
    background-color: white;
    border-color: black;
    border-width: 2px;
    border-style: solid;
    border-radius: 20px;
    display: flex;
    padding: 10px 15px;
    align-items: center;
    margin: 10px 0px;
    font-size: 16px;
    justify-content: space-between;
    @media(max-width: 500px) {
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

    }
`

export const Value = styled.h3`
    font-size: 30px;
    margin-right: 20px;
`

export const MobileHeaderSection = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;
    @media(max-width: 500px) {
        margin: 5px 0px;
    }
`

export const MobileDataSection = styled.div`
    width: calc(100% - 250px);
    display: flex;
    justify-content: space-between;
    @media(max-width: 800px) {
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        h3 {
            margin: 2px 0px;
        }
    }
    @media(max-width: 500px) {
        width: 100%;
    }
`
