import { MobileDataSection, MobileHeaderSection, TransfWrapper, Value } from "./styles";
import { BsFillArrowDownRightCircleFill } from "react-icons/bs"
import { BsFillArrowUpRightCircleFill } from "react-icons/bs"

function formatDate(data) {
    const year = data.slice(0, 4)
    const month = data.slice(5, 7)
    const day = data.slice(8, 10)
    return `${day}/${month}/${year}`
}
function formatHour(data) {
    const hour = data.slice(11, 13)
    const minute = data.slice(14, 16)
    const second = data.slice(17, 19)
    return `${hour}:${minute}:${second}`
}

export default function Transferencia({transf}) {

    return (
        <TransfWrapper>
            <MobileHeaderSection>
                {transf.origem ? (
                    <BsFillArrowDownRightCircleFill size={50} color="green" />
                ):(
                    <BsFillArrowUpRightCircleFill size={50} color="red" />
                    )}
                <Value>R${transf.valor}</Value>
            </MobileHeaderSection>
            <MobileDataSection>
                {transf.origem ? (
                    <h3>De: {transf.origem}</h3>
                    ):(
                        <h3>Para: {transf.destino}</h3>
                        )}
                <h3>Data: {formatDate(transf.data)}</h3>
                <h3>Hora: {formatHour(transf.data)}</h3>
            </MobileDataSection>
        </TransfWrapper>
    )
}
