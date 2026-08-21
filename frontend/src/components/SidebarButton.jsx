function SidebarButton({ active, icon, buttonText, onClick }) {
  return (
    <div
      className={
        active
          ? "flex w-full h-14 bg-taupe-700/60 rounded-lg justify-center items-center shadow-sm transition-all duration-300 ease-out border-b border-taupe-700/50"
          : "flex w-full h-14 rounded-lg justify-center items-center transition-all duration-300 ease-out hover:bg-taupe-700/60 border-b border-taupe-700/50"
      }
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span
          className={
            active
              ? "font-lustria text-2xl text-taupe-200 transition-colors duration-300"
              : "font-lustria text-2xl text-white transition-colors duration-300"
          }
        >
          {buttonText}
        </span>
      </div>
    </div>
  );
}

export default SidebarButton;