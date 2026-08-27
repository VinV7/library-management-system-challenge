// Main Import
import { useState, useEffect } from "react";

// Components Import
import Sidebar from "../components/Sidebar";
import CatalogPanel from "../components/panels/CatalogPanel";
import AddBookPanel from "../components/panels/AddBookPanel";

// Services
import get_books from "../services/get_books";

function Librarian() {
  const [activePanel, setActivePanel] = useState("Catalog");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await get_books();
        setBooks(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

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
