export default function Logo() {
    return (
        <div className={`
            flex flex-col justify-center items-center
            h-12 w-12 rounded-full
            bg-white
        `}>
            <div className="h-3 w-3 rounded-full bg-red-600 mb-1" />
            <div className="flex">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1" />
                <div className="h-3 w-3 rounded-full bg-green-600 ml-1" />
            </div>
        </div>
    )
}