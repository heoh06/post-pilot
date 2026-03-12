type TabButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}

const TabButton = ({ children, onClick, active }: TabButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-6 py-2 font-medium transition-all ${active ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
    >
      {children}
    </button>
  )
}

export default TabButton;