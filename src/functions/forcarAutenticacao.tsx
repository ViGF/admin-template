import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import loading from '../../public/images/loading.gif'
import useAuth from "../data/hook/useAuth"

export default function ForcarAutenticacao(tsx) {
    const { usuario, carregando } = useAuth()
    const router = useRouter()
    
    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes('admin-template-cod3r-auth')) {
                                    window.location.href = '/autenticacao'
                                }
                            `
                        }}
                    />
                </Head>
                {tsx}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-800">
                <Image
                    src={loading}
                    alt='Animação de Carregamento'
                    width={100}
                    height={100}
                />
            </div>
        )
    }
    
    if(!carregando  && usuario?.email) {
        return renderizarConteudo()
    } else if(carregando) {
        return renderizarCarregando()
    } else {
        router.push('/autenticacao')
        return null
    }
}