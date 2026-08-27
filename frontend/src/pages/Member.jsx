// Main Import
import { useEffect, useState } from "react";

// Components Import
import Sidebar from "../components/Sidebar";
import MemberCatalogPanel from "../components/panels/MemberCatalogPanel";
import BorrowedBooksPanel from "../components/panels/BorrowedBookPanel";

// Services Import
import member_services from "../services/member_services";

function Member() {
  const [activePanel, setActivePanel] = useState("Catalog");
  const [books, setBooks] = useState([]);
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMemberData() {
      try {
        const data = await member_services();

        setBooks(data.books);
        setBorrowings(data.lendings);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMemberData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        buttons={[{ key: "Catalog" }, { key: "Borrowed Books" }]}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      />

      <div
        className={
          activePanel === "Catalog" ? "flex flex-1 flex-col min-h-0" : "hidden"
        }
      >
        <MemberCatalogPanel books={books} />
      </div>

      <div
        className={
          activePanel === "Borrowed Books"
            ? "flex flex-1 flex-col min-h-0"
            : "hidden"
        }
      >
        <BorrowedBooksPanel borrowedBooks={borrowings}/>
      </div>
    </div>
  );
}

export default Member;
