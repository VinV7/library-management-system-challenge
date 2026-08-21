// Main Import
import { useState } from "react";

// Components Import
import SidebarButton from "./SidebarButton";

function Sidebar({ setButtons }) {
  const buttons = setButtons;

  const [activePanel, setActivePanel] = useState("Catalog");

  return (
    <div className="w-76 h-screen pt-12 px-5 bg-taupe-800">
      {buttons.map((button) => (
        <SidebarButton
          key={button.key}
          buttonText={button.key}
          active={button.key === activePanel}
          onClick={() => setActivePanel(button.key)}
        ></SidebarButton>
      ))}
    </div>
  );
}

export default Sidebar;
