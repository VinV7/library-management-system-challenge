// Main Import
import { useState } from "react";

// Components Import
import Sidebar from "../components/Sidebar";
import CatalogPanel from "../components/panels/CatalogPanel";
import AddBookPanel from "../components/panels/AddBookPanel";
import ManageMemberPanel from "../components/panels/ManageMemberPanel";
import ManageLibrarianPanel from "../components/panels/ManageLibrarianPanel";

function MasterLibrary() {
  const [activePanel, setActivePanel] = useState("Catalog");

  return (
    <div className="flex h-screen overflow-hidden">
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
      <div
        className={
          activePanel === "Manage Member" ? "flex flex-1 flex-col min-h-0" : "hidden"
        }
      >
        <ManageMemberPanel></ManageMemberPanel>
      </div>
      <div
        className={
          activePanel === "Manage Librarian" ? "flex flex-1 flex-col min-h-0" : "hidden"
        }
      >
        <ManageLibrarianPanel></ManageLibrarianPanel>
      </div>
    </div>
  );
}

export default MasterLibrary;
