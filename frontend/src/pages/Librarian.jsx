// Main Import
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components Import
import Sidebar from "../components/Sidebar";
import CatalogPanel from "../components/panels/CatalogPanel";
import AddBookPanel from "../components/panels/AddBookPanel";

// Services
import librarian_services from "../services/librarian_services";

function Librarian() {
  const [books, setBooks] = useState([]);

  const [activePanel, setActivePanel] = useState("Catalog");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDatas() {
      try {
        const data = await librarian_services();

        if (data.cookie !== true) {
          navigate("/")
        }

        setBooks(data.books);
        setPageLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    }

    fetchDatas();
  }, []);

  if (pageLoading === true) {
    return (
      <div>
        Page Loading...
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-y-hidden">
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
        <CatalogPanel books={books} loading={loading} error={error}></CatalogPanel>
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
