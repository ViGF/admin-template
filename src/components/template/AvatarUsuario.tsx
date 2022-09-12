import Image from "next/image";
import Link from "next/link";
import useAuth from "../../data/hook/useAuth";

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario({ className }: AvatarUsuarioProps) {
    const { usuario } = useAuth()

    return (
        <Link href='/perfil'>
            <div className={`cursor-pointer ${className}`}>
                <Image
                    src={usuario?.imagemUrl ?? '/images/avatar.svg'}
                    alt='Avatar do Usuário'
                    width={40}
                    height={40}
                    className='rounded-full'
                />
            </div>
        </Link>
    )
}