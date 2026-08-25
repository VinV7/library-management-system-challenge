// Main Import
import { useState } from "react";

// Components Import
import Sidebar from "../components/Sidebar";
import CatalogPanel from "../components/panels/CatalogPanel";
import AddBookPanel from "../components/panels/AddBookPanel";

function Librarian() {
  const [activePanel, setActivePanel] = useState("Catalog");

  return (
    <div className="flex h-screen">
      <Sidebar
        buttons={[
          { key: "Catalog" },
          { key: "Add Book" }
        ]}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      ></Sidebar>
      <div
        className={
          activePanel === "Catalog" ? "flex flex-1 flex-col min-h-0" : "hidden"
        }
      >
        <CatalogPanel></CatalogPanel>
      </div>
      <div
        className={
          activePanel === "Add Book" ? "flex flex-1 flex-col min-h-0" : "hidden"
        }
      >
        <AddBookPanel></AddBookPanel>
      </div>
    </div>
  );
}

export default Librarian;
