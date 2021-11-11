import { StyledInput } from "./styles";

export default function Input({value, onChange, label, disabled, ...rest}) {
    return (
        <label>
            {`${label}: `}
            <StyledInput {...rest} disabled={disabled} value={value} label={label} onChange={onChange}/>
        </label>
    )
}