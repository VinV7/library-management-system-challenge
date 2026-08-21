// Components Import
import Sidebar from "../components/Sidebar";

function MasterLibrary() {
  return (
    <div className="flex">
      <Sidebar
        setButtons={[
          { key: "Catalog" },
          { key: "Add Book" },
          { key: "Manage Member" },
          { key: "Manage Librarian" },
        ]}
      ></Sidebar>
    </div>
  );
}

export default MasterLibrary;
