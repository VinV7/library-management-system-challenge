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
    </div>
  );
}

export default Sidebar;
