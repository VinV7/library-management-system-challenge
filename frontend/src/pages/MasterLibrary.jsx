// Main Import
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components Import
import Sidebar from "../components/Sidebar";
import CatalogPanel from "../components/panels/CatalogPanel";
import AddBookPanel from "../components/panels/AddBookPanel";
import ManageMemberPanel from "../components/panels/ManageMemberPanel";
import ManageLibrarianPanel from "../components/panels/ManageLibrarianPanel";

// Services Import
import master_library_services from "../services/master_library_services";

function MasterLibrary() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [librarians, setLibrarians] = useState([]);

  const [pageLoading, setPageLoading] = useState(true);
  const [activePanel, setActivePanel] = useState("Catalog");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await master_library_services();

        if (data.cookies !== true) {
          navigation("/");
          return;
        }

        setBooks(data.books);
        setMembers(data.members);
        setLibrarians(data.librarians);

        setPageLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (pageLoading === true) {
    return (
      <div> 
        Page Loading...
      </div>
    )
  }

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
        <CatalogPanel
          books={books}
          loading={loading}
          error={error}
        ></CatalogPanel>
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
          activePanel === "Manage Member"
            ? "flex flex-1 flex-col min-h-0"
            : "hidden"
        }
      >
        <ManageMemberPanel members={members}></ManageMemberPanel>
      </div>
      <div
        className={
          activePanel === "Manage Librarian"
            ? "flex flex-1 flex-col min-h-0"
            : "hidden"
        }
      >
        <ManageLibrarianPanel librarians={librarians}></ManageLibrarianPanel>
      </div>
    </div>
  );
}

export default MasterLibrary;
