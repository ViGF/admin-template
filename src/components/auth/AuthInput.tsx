import { InputHTMLAttributes } from "react"

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    naoRenderizarQuando?: boolean
    label: string
}

export default function AuthInput({ label, naoRenderizarQuando, ...rest }: AuthInputProps) {
    return naoRenderizarQuando ? null : (
        <div className="flex flex-col mt-4">
            <label>{label}</label>
            <input
                {...rest}
                className={`
                    px-4 py-3 rounded-lg bg-gray-200 mt-1 border
                    focus:border-blue-500 focus:outline-none focus:bg-white
                `}
            />
        </div>
    )
}