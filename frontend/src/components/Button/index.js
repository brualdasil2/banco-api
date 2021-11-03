import { StyledButton } from "./styles";

    export default function Button({children, color="#C8D9F5", ...rest}) {

    return (
        <>
            <StyledButton {...rest} color={color}>{children}</StyledButton>
        </>
    )
}