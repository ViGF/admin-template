import { IconeLua, IconeSol } from "../icons"

interface BotaoAlternarTemaProps {
    theme: string
    alternarTema: () => void
}

export default function BotaoAlternarTema({ theme, alternarTema }: BotaoAlternarTemaProps) {
    return theme === 'dark' ? (
        <div onClick={alternarTema} className={`
            hidden sm:flex items-center cursor-pointer
            bg-gradient-to-r from-yellow-300 to-yellow-500
            w-16 lg:w-24 h-8 p-1 rounded-full
        `}>
            <div className={`
                flex items-center justify-center
                bg-white text-yellow-600 w-6 h-6 rounded-full
            `}>
                <IconeSol className="w-4 h-4" />
            </div>
            <div className={`
                hidden lg:flex items-center ml-2 text-white select-none
            `}>
                <span>Claro</span>
            </div>
        </div>
    ) : (
        <div onClick={alternarTema} className={`
            hidden sm:flex items-center justify-end
            bg-gradient-to-r from-gray-500 to-gray-900
            w-16 lg:w-24 h-8 p-1 rounded-full cursor-pointer
        `}>
            <div className={`
                hidden lg:flex items-center mr-1 text-gray-100 select-none
            `}>
                <span>Escuro</span>
            </div>
            <div className={`
                flex items-center justify-center
                bg-black text-gray-100 w-6 h-6 rounded-full
            `}>
                <IconeLua className="w-4 h-4" />
            </div>
        </div>
    )
}