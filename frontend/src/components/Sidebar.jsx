// Components Import
import SidebarButton from "./SidebarButton";

// File Import
import logo from "../assets/library_logo.png";

function Sidebar({ buttons, activePanel, setActivePanel }) {
  return (
    <div className="flex flex-col w-72 h-screen bg-taupe-800 border-r border-taupe-700/50">
      <div className="flex items-center justify-center px-4 pt-6 pb-5 border-b border-taupe-700/50">
        <a href="/">
          <img src={logo} className="h-20 w-auto" />
        </a>
      </div>

      <div className="flex-1 flex flex-col gap-2 px-4 pt-5 overflow-y-auto">
        {buttons.map((button) => (
          <SidebarButton
            key={button.key}
            buttonText={button.key}
            icon={button.icon}
            active={button.key === activePanel}
            onClick={() => setActivePanel(button.key)}
          />
        ))}
      </div>

      <div className="px-4 pb-6 pt-4 border-t border-taupe-700/50">
        <button
          type="button"
          className="flex items-center gap-3 w-full h-12 px-4 rounded-lg font-lustria text-base text-taupe-300 transition-all duration-300 ease-out hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/50"
        >
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
