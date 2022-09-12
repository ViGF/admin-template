import MenuItem from "./MenuItem";
import Logo from './Logo'
import { IconeAjustes, IconeCasa, IconeSair, IconeSino } from "../icons";
import useAuth from "../../data/hook/useAuth";

export default function MenuLateral() {
    const { logout } = useAuth()

    return (
        <aside className="flex flex-col dark:bg-gray-900">
            <div className={`
                flex items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}>
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItem url="/" texto="Inicio" icone={<IconeCasa />} />
                <MenuItem url="/ajustes" texto="Ajustes" icone={<IconeAjustes />} />
                <MenuItem url="/notificacoes" texto="Notificações" icone={<IconeSino />} />
            </ul>
            <ul className="items-end">
                <MenuItem
                    onClick={logout}
                    texto="Sair"
                    icone={<IconeSair />}
                    className={`
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white
                    `}
                />
            </ul>
        </aside>
    )
}