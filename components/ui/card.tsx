const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className ?? ""}`}>
            {children}
        </div>
    )
}

export default Card;