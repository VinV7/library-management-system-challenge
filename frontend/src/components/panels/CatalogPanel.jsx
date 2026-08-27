// Main Imports
import { useState } from "react";

// Components
import BookCard from "../EditBookCard"
import BookEditSidePanel from "../BookEditSidePanel";

function CatalogPanel({ books = [], loading = false, error = null }) {
  const [editPanel, setEditPanel] = useState(false);
  const [bookData, setBookData] = useState(null);

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-1 w-full min-h-0">
      <div
        className={`grid gap-3 px-4 py-10 bg-white flex-1 overflow-y-auto min-h-0 ${
          editPanel
            ? "grid-cols-2 lg:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
        }`}
      >
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            imgLink={book.image_link}
            onClick={() => {
              setEditPanel(true);
              setBookData(book);
            }}
          />
        ))}
      </div>

      <BookEditSidePanel
        panelOpen={editPanel}
        setPanelOpen={() => setEditPanel(false)}
        bookData={bookData}
      />
    </div>
  );
}

export default CatalogPanel;