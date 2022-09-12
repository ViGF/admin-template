import useAppData from "../../data/hook/useAppData"
import forcarAutenticacao from "../../functions/ForcarAutenticacao"
import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import MenuLateral from "./MenuLateral"

interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: JSX.Element
}

export default function Layout({ titulo, subtitulo, children }: LayoutProps) {
    const { theme } = useAppData()

    return forcarAutenticacao(
            <div className={`${theme} flex h-screen w-screen`}>
                <MenuLateral />
                <div className={`
                    flex flex-col bg-gray-300 w-full dark:bg-gray-800 p-7
                `}>
                    <Cabecalho titulo={titulo} subtitulo={subtitulo} />
                    <Conteudo>
                        {children}
                    </Conteudo>
                </div>
            </div>
    )
}