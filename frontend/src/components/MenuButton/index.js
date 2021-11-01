import { useHistory } from "react-router"
import { Button, ButtonTitle } from "./styles"

export default function MenuButton({children, destination, title}) {
    const history = useHistory()
    return (
        <div>
            <Button onClick={() => history.push(destination)}>
                {children}
            </Button>
            <ButtonTitle>
                {title}
            </ButtonTitle>
        </div>
    )
}