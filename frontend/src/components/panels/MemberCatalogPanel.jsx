// Main Import
import { useState } from "react";

// Components Import
import BookCard from "../RegularBookCard";
import BookInfoSidePanel from "../BookInfoSidePanel";

// Services
import borrow_book from "../../services/borrow_book";

function MemberCatalogPanel({ books }) {
  const [showInfo, setShowInfo] = useState(false);
  const [bookData, setBookData] = useState(null);

  const onClickBorrow = async (book) => {
    try {
      const result = await borrow_book({
        book_id: book.id
      });

      console.log(result);

    } catch (err) {
      console.error("Failed to borrow book:", err);
    }
  };

  const onClickInfo = (book) => {
    setShowInfo(true);
    setBookData(book);
  };

  return (
    <div className="flex flex-1 w-full min-h-0">

      <div
        className={`grid gap-3 px-4 py-10 bg-white flex-1 overflow-y-auto min-h-0 ${
          showInfo
            ? "grid-cols-2 lg:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
        }`}
      >

        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            imgLink={book.image_link}

            onClickBorrow={() => onClickBorrow(book)}

            onClick={() => onClickInfo(book)}
          />
        ))}

      </div>

      <BookInfoSidePanel
        panelOpen={showInfo}
        setPanelOpen={() => setShowInfo(false)}
        bookData={bookData}
      />

    </div>
  );
}

export default MemberCatalogPanel;