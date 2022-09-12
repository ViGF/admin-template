import Image from "next/image";
import { FormEvent, useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconeAtencao } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Autenticacao() {
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [erro, setErro] = useState(null)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const { cadastrar, login, loginGoogle } = useAuth()

    function exibirErro(msg, tempo = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempo * 1000);
    }

    async function submeter(e: FormEvent) {
        e.preventDefault()
        try {
            if (modo === 'login') {
                await login(email, senha)
            } else {
                await cadastrar(email, senha)
            }
        } catch(e) {
            exibirErro(e?.message ?? 'Ocorreu um erro! Tente Novamente')
        }
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="hidden sm:block w-1/2 lg:w-2/3 h-screen overflow-hidden relative">
                <Image
                    src="https://source.unsplash.com/random"
                    alt="Iamgem da tela de autenticação gerada aleatoriamente"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div>
            <div className="w-full sm:w-1/2 lg:1/3 m-6">
                <h1 className="text-2xl font-bold mb-5 sm:text-left text-center">
                    {modo === 'login'
                        ? 'Entre com a sua Conta'
                        : 'Cadastre-se na Plataforma'}
                </h1>
                {erro ? (
                        <div className={`
                            flex items-center
                            bg-red-400 text-white py-3 px-5 my-2
                            border border-red-500 rounded-lg
                        `}>
                            <IconeAtencao />
                            <span className="ml-3">{erro}</span>
                        </div>
                    ) : false}
                <form onSubmit={e => submeter(e)}>
                    <AuthInput
                        label="Email"
                        value={email}
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <AuthInput
                        label="Senha"
                        value={senha}
                        type='password'
                        onChange={e => setSenha(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className={`
                        w-full bg-indigo-500 hover:bg-indigo-400
                        text-white rounded-lg px-4 py-3 mt-6
                    `}>
                        {modo === 'login'
                            ? 'Entrar'
                            : 'Cadastrar'}
                    </button>
                </form>
                <hr className="my-6 border-gray-300 w-full" />
                <button
                    type="submit"
                    onClick={loginGoogle}
                    className={`
                        w-full bg-red-500 hover:bg-red-400
                        text-white rounded-lg px-4 py-3 mt-6
                    `}>
                    Entrar com Google
                </button>
                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')}
                            className={`
                                text-blue-500 hover:text-blue-700
                                font-semibold cursor-pointer
                            `}>
                            &nbsp;Criar uma conta gratuitamente
                        </a>
                    </p>
                ): (
                    <p className="mt-8">
                        Já faz parte da nossa comunidade?
                        <a onClick={() => setModo('login')}
                            className={`
                                text-blue-500 hover:text-blue-700
                                font-semibold cursor-pointer
                            `}>
                             &nbsp;Entre usando a sua conta
                        </a>
                    </p>
                )}
            </div>
        </div>
    )
}