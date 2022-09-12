import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    theme?: string
    alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider({ children }: any) {
    const [theme, setTheme] = useState('dark')

    function alternarTema() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const themeValue = localStorage.getItem('theme')
        setTheme(themeValue)
    }, [])

    return (
        <AppContext.Provider value={{
            theme,
            alternarTema
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext