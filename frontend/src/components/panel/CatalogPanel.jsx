// Main Imports
import { useState } from "react";

// Components import
import BookCard from "../BookCard";
import BookEditSidePanel from "../BookEditSidePanel";

const books = [
  {
    title: "The Lord of the Rings",
    isbn: "9780544003415",
    book_categories: ["Fantasy", "Adventure", "Epic"],
    stock: 12,
    release_date: "1954-07-29",
    img_link: "https://m.media-amazon.com/images/I/51t0Z0DfEfL._SY425_.jpg",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    isbn: "9780747532699",
    book_categories: ["Fantasy", "Adventure", "Young Adult"],
    stock: 8,
    release_date: "1997-06-26",
    img_link: "https://m.media-amazon.com/images/I/51pYBCpDUiL._SY445_SX342_FMwebp_.jpg",
  },
  {
    title: "1984",
    isbn: "9780451524935",
    book_categories: ["Dystopian", "Science Fiction", "Political Fiction"],
    stock: 15,
    release_date: "1949-06-08",
    img_link: "",
  },
  {
    title: "The Great Gatsby",
    isbn: "9780743273565",
    book_categories: ["Classic", "Fiction", "Tragedy"],
    stock: 6,
    release_date: "1925-04-10",
    img_link: "",
  },
  {
    title: "To Kill a Mockingbird",
    isbn: "9780061120084",
    book_categories: ["Classic", "Historical Fiction", "Drama"],
    stock: 10,
    release_date: "1960-07-11",
    img_link: "",
  },
  {
    title: "Pride and Prejudice",
    isbn: "9780141439518",
    book_categories: ["Romance", "Classic", "Fiction"],
    stock: 7,
    release_date: "1813-01-28",
    img_link: "",
  },
  {
    title: "The Hobbit",
    isbn: "9780547928227",
    book_categories: ["Fantasy", "Adventure", "Children's Fiction"],
    stock: 11,
    release_date: "1937-09-21",
    img_link: "",
  },
  {
    title: "Crime and Punishment",
    isbn: "9780143058144",
    book_categories: ["Classic", "Psychological Fiction", "Crime"],
    stock: 5,
    release_date: "1866-01-01",
    img_link: "",
  },
  {
    title: "The Alchemist",
    isbn: "9780062315007",
    book_categories: ["Adventure", "Philosophical Fiction"],
    stock: 14,
    release_date: "1988-01-01",
    img_link: "",
  },
  {
    title: "Clean Code",
    isbn: "9780132350884",
    book_categories: ["Programming", "Software Engineering", "Technology"],
    stock: 9,
    release_date: "2008-08-01",
    img_link: "",
  },
  {
    title: "Dune",
    isbn: "9780441172719",
    book_categories: ["Science Fiction", "Adventure", "Epic"],
    stock: 13,
    release_date: "1965-08-01",
    img_link: "",
  },
  {
    title: "The Catcher in the Rye",
    isbn: "9780316769488",
    book_categories: ["Classic", "Coming-of-Age", "Fiction"],
    stock: 6,
    release_date: "1951-07-16",
    img_link: "",
  },
  {
    title: "The Da Vinci Code",
    isbn: "9780307474278",
    book_categories: ["Mystery", "Thriller", "Adventure"],
    stock: 10,
    release_date: "2003-04-01",
    img_link: "",
  },
  {
    title: "The Hunger Games",
    isbn: "9780439023481",
    book_categories: ["Dystopian", "Science Fiction", "Young Adult"],
    stock: 16,
    release_date: "2008-09-14",
    img_link: "",
  },
  {
    title: "The Shining",
    isbn: "9780307743657",
    book_categories: ["Horror", "Psychological Fiction", "Thriller"],
    stock: 7,
    release_date: "1977-01-28",
    img_link: "",
  },
  {
    title: "The Book Thief",
    isbn: "9780375842207",
    book_categories: ["Historical Fiction", "Drama", "Young Adult"],
    stock: 9,
    release_date: "2005-03-14",
    img_link: "",
  },
  {
    title: "The Martian",
    isbn: "9780553418026",
    book_categories: ["Science Fiction", "Adventure", "Survival"],
    stock: 12,
    release_date: "2011-02-11",
    img_link: "",
  },
  {
    title: "Sherlock Holmes: The Complete Novels and Stories",
    isbn: "9780553328257",
    book_categories: ["Mystery", "Crime", "Classic"],
    stock: 8,
    release_date: "1887-01-01",
    img_link: "",
  },
  {
    title: "The Picture of Dorian Gray",
    isbn: "9780141439570",
    book_categories: ["Classic", "Gothic Fiction", "Philosophical Fiction"],
    stock: 5,
    release_date: "1890-06-20",
    img_link: "",
  },
  {
    title: "The Silent Patient",
    isbn: "9781250301697",
    book_categories: ["Psychological Thriller", "Mystery", "Crime"],
    stock: 11,
    release_date: "2019-02-05",
    img_link: "",
  },
];

function CatalogPanel() {
  const [editPanel, setEditPanel] = useState();

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
          <BookCard title={book.title} imgLink={book.img_link} onClick={() => setEditPanel(true)}></BookCard>
        ))}
      </div>
      <BookEditSidePanel panelOpen={editPanel}></BookEditSidePanel>
    </div>
  );
}

export default CatalogPanel;
