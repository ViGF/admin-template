import useAppData from "../../data/hook/useAppData"
import AvatarUsuario from "./AvatarUsuario"
import BotaoAlternarTema from "./BotaoAlternarTema"
import Titulo from "./Titulo"

interface CabecalhoProps {
    titulo: string
    subtitulo: string
}

export default function Cabecalho({ titulo, subtitulo }: CabecalhoProps) {
    const { theme, alternarTema } = useAppData()

    return (
        <div className="flex">
            <Titulo titulo={titulo} subtitulo={subtitulo} />
            <div className="flex flex-grow justify-end items-center">
                <BotaoAlternarTema theme={theme} alternarTema={alternarTema} />
                <AvatarUsuario className="ml-3" />
            </div>
        </div>
    )
}