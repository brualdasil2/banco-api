import styled from "styled-components";

export const StyledButton = styled.button`
    border-radius: 5px;
    border-width: 0px;
    background-color: ${props => props.color};
    padding: 5px 10px;
    margin: 15px 0px;
    :hover:enabled {
        opacity: 0.7;
        cursor: pointer;
    }
    font-weight: bold;
`