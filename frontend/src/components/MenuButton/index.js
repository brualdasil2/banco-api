import { useHistory } from "react-router"

export default function MenuButton({children, destination}) {
    const history = useHistory()
    return (
        <button onClick={() => history.push(destination)}>
            {children}
        </button>
    )
}