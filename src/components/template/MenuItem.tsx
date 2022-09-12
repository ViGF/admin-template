import Link from "next/link"

interface MenuItemProps {
    url?: string
    texto: string
    icone: JSX.Element
    className?: string
    onClick? : (evento: any) => void
}

export default function MenuItem({ url, texto, icone, onClick, className }: MenuItemProps) {
    function renderizarLink() {
        return (
            <a className={`
                        flex flex-col justify-center items-center
                        h-20 w-20 text-gray-600 ${className} dark:text-gray-200
                    `}>
                {icone}
                <span className={`
                            text-xs font-light
                        `}>
                    {texto}
                </span>
            </a>
        )
    }

    return (
        <li onClick={onClick} className={`
            hover:bg-gray-100 dark:hover:bg-gray-700
            cursor-pointer
        `}>
            {url ? (
                <Link href={url}>
                    {renderizarLink()}
                </Link>
            ) : renderizarLink()}
        </li>
    )
}