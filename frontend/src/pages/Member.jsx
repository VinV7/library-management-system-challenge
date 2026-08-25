// Main Import
import { useState } from "react";

// Components Import
import Sidebar from "../components/Sidebar";
import MemberCatalogPanel from "../components/panels/MemberCatalogPanel";

function Member() {
  const [activePanel, setActivePanel] = useState("Catalog");
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        buttons={[{ key: "Catalog" }, { key: "Borrowed Books" }]}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      ></Sidebar>
      <div
        className={
          activePanel === "Catalog" ? "flex flex-1 flex-col min-h-0" : "hidden"
        }
      >
        <MemberCatalogPanel></MemberCatalogPanel>
      </div>
      <div
        className={
          activePanel === "Catalog" ? "flex flex-1 flex-col min-h-0" : "hidden"
        }
      >
        <MemberCatalogPanel></MemberCatalogPanel>
      </div>
    </div>
  );
}

export default Member;
