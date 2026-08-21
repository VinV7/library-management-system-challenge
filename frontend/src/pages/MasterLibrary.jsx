// Main Import
import { useState } from "react";

// Components Import
import Sidebar from "../components/Sidebar";
import CatalogPanel from "../components/panel/CatalogPanel";

function MasterLibrary() {
  const [activePanel, setActivePanel] = useState("Catalog");

  return (
    <div className="flex">
      <div>
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
      <div className={activePanel === "Catalog" ? "flex flex-1 flex-col min-h-0" : "hidden"}>
        <CatalogPanel></CatalogPanel>
      </div>
    </div>
  );
}

export default MasterLibrary;
