interface ConteudoProps {
    children?: JSX.Element
}

export default function Conteudo({ children }: ConteudoProps) {
    return (
        <div className={`
            flex flex-col mt-7 dark:text-gray-200
        `}>
            {children}
        </div>
    )
}