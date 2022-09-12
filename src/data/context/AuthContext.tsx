import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../../firebase/config'
import { signInWithPopup, GoogleAuthProvider, User, onIdTokenChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import Cookies from 'js-cookie'
import Usuario from '../../model/Usuario'

interface AuthContextProps {
    usuario?: Usuario
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
    carregando?: boolean
    login?: (email: string, senha: string) => Promise<void>
    cadastrar?: (email: string, senha: string) => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()

    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-template-cod3r-auth', logado, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-cod3r-auth')
    }
}

export function AuthProvider({ children }: any) {
    const [usuario, setUsuario] = useState<Usuario>(null)
    const [carregando, setCarregando] = useState(true)
    const route = useRouter()

    async function configurarSessao(usuarioFirebase) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function login(email, senha) {
        try {
            setCarregando(true)
            const novoUsuario = await signInWithEmailAndPassword(auth, email, senha)
            configurarSessao(novoUsuario.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true)
            const novoUsuario = await signInWithPopup(auth, new GoogleAuthProvider())
            configurarSessao(novoUsuario.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await signOut(auth)
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email, senha) {
        try {
            setCarregando(true)
            const novoUsuario = await createUserWithEmailAndPassword(auth, email, senha)
            configurarSessao(novoUsuario.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if(Cookies.get('admin-template-cod3r-auth')) {
            const cancelar = onIdTokenChanged(auth, configurarSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle,
            logout,
            carregando,
            login,
            cadastrar
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext