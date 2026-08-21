// Main Import 
import { useState } from "react";

// Components Import
import Sidebar from "../components/Sidebar";

function MasterLibrary() {
    const [activePanel, setActivePanel] = useState('Catalog')

  return (
    <div className="flex">
      <Sidebar
        buttons={[
          { key: "Catalog" },
          { key: "Add Book" },
          { key: "Manage Member" },
          { key: "Manage Librarian" },
        ]} 
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      ></Sidebar>
    </div>
  );
}

export default MasterLibrary;
