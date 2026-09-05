// Main Import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const [cookies, setCookies] = useState(false)

  const [pageLoading, setPageLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMemberData() {
      try {
        const data = await member_services();

        if (cookies !== true) {
          navigate("/");
          return;
        }

        setBooks(data.books);
        setBorrowings(data.lendings);
        setPageLoading(false);
      } catch (err) {
        console.error(err)
      } 
    }

    fetchMemberData();
  }, []);

  if (pageLoading === true) {
    return <div>Page Loading...</div>;
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
        <BorrowedBooksPanel borrowedBooks={borrowings} />
      </div>
    </div>
  );
}

export default Member;
