// File Imports
import logo from "../assets/library_logo.png";

const books = [
  {
    title: "The Lord of the Rings",
    isbn: "9780544003415",
    book_categories: ["Fantasy", "Adventure", "Epic"],
    stock: 12,
    availability: true,
    release_date: "1954-07-29",
    img_link: "https://m.media-amazon.com/images/I/51t0Z0DfEfL._SY425_.jpg",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    isbn: "9780747532699",
    book_categories: ["Fantasy", "Adventure", "Young Adult"],
    stock: 8,
    availability: false,
    release_date: "1997-06-26",
    img_link:
      "https://m.media-amazon.com/images/I/51pYBCpDUiL._SY445_SX342_FMwebp_.jpg",
  },
  {
    title: "1984",
    isbn: "9780451524935",
    book_categories: ["Dystopian", "Science Fiction", "Political Fiction"],
    stock: 15,
    availability: true,
    release_date: "1949-06-08",
    img_link: "",
  },
  {
    title: "The Great Gatsby",
    isbn: "9780743273565",
    book_categories: ["Classic", "Fiction", "Tragedy"],
    stock: 6,
    availability: false,
    release_date: "1925-04-10",
    img_link: "",
  },
  {
    title: "To Kill a Mockingbird",
    isbn: "9780061120084",
    book_categories: ["Classic", "Historical Fiction", "Drama"],
    stock: 10,
    availability: true,
    release_date: "1960-07-11",
    img_link: "",
  },
  {
    title: "Pride and Prejudice",
    isbn: "9780141439518",
    book_categories: ["Romance", "Classic", "Fiction"],
    stock: 7,
    availability: true,
    release_date: "1813-01-28",
    img_link: "",
  },
  {
    title: "The Hobbit",
    isbn: "9780547928227",
    book_categories: ["Fantasy", "Adventure", "Children's Fiction"],
    stock: 11,
    availability: true,
    release_date: "1937-09-21",
    img_link: "",
  },
  {
    title: "Crime and Punishment",
    isbn: "9780143058144",
    book_categories: ["Classic", "Psychological Fiction", "Crime"],
    stock: 5,
    availability: true,
    release_date: "1866-01-01",
    img_link: "",
  },
  {
    title: "The Alchemist",
    isbn: "9780062315007",
    book_categories: ["Adventure", "Philosophical Fiction"],
    stock: 14,
    availability: true,
    release_date: "1988-01-01",
    img_link: "",
  },
  {
    title: "Clean Code",
    isbn: "9780132350884",
    book_categories: ["Programming", "Software Engineering", "Technology"],
    stock: 9,
    availability: true,
    release_date: "2008-08-01",
    img_link: "",
  },
  {
    title: "Dune",
    isbn: "9780441172719",
    book_categories: ["Science Fiction", "Adventure", "Epic"],
    stock: 13,
    availability: true,
    release_date: "1965-08-01",
    img_link: "",
  },
  {
    title: "The Catcher in the Rye",
    isbn: "9780316769488",
    book_categories: ["Classic", "Coming-of-Age", "Fiction"],
    stock: 6,
    availability: true,
    release_date: "1951-07-16",
    img_link: "",
  },
  {
    title: "The Da Vinci Code",
    isbn: "9780307474278",
    book_categories: ["Mystery", "Thriller", "Adventure"],
    stock: 10,
    availability: true,
    release_date: "2003-04-01",
    img_link: "",
  },
  {
    title: "The Hunger Games",
    isbn: "9780439023481",
    book_categories: ["Dystopian", "Science Fiction", "Young Adult"],
    stock: 16,
    availability: true,
    release_date: "2008-09-14",
    img_link: "",
  },
  {
    title: "The Shining",
    isbn: "9780307743657",
    book_categories: ["Horror", "Psychological Fiction", "Thriller"],
    stock: 7,
    availability: true,
    release_date: "1977-01-28",
    img_link: "",
  },
  {
    title: "The Book Thief",
    isbn: "9780375842207",
    book_categories: ["Historical Fiction", "Drama", "Young Adult"],
    stock: 9,
    availability: true,
    release_date: "2005-03-14",
    img_link: "",
  },
  {
    title: "The Martian",
    isbn: "9780553418026",
    book_categories: ["Science Fiction", "Adventure", "Survival"],
    stock: 12,
    availability: true,
    release_date: "2011-02-11",
    img_link: "",
  },
  {
    title: "Sherlock Holmes: The Complete Novels and Stories",
    isbn: "9780553328257",
    book_categories: ["Mystery", "Crime", "Classic"],
    stock: 8,
    availability: true,
    release_date: "1887-01-01",
    img_link: "",
  },
  {
    title: "The Picture of Dorian Gray",
    isbn: "9780141439570",
    book_categories: ["Classic", "Gothic Fiction", "Philosophical Fiction"],
    stock: 5,
    availability: true,
    release_date: "1890-06-20",
    img_link: "",
  },
  {
    title: "The Silent Patient",
    isbn: "9781250301697",
    book_categories: ["Psychological Thriller", "Mystery", "Crime"],
    stock: 11,
    availability: true,
    release_date: "2019-02-05",
    img_link: "",
  },
];

function Books() {
  return (
    <div className="min-h-screen bg-taupe-50">
      <nav className="flex w-full h-24 px-16 bg-taupe-800 justify-between items-center shadow-sm border-b border-taupe-700/50">
        <a href="/" className="flex items-center">
          <img src={logo} className="w-auto h-18" />
        </a>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="group relative text-xl text-taupe-100 font-lustria tracking-wide hover:text-white transition-colors duration-200"
            >
              Login
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </a>
            <span className="text-taupe-600">|</span>
            <a
              href="/register"
              className="text-lg font-lustria tracking-wide px-5 py-2 rounded-full bg-white text-taupe-800 hover:bg-taupe-100 hover:scale-105 transition-all duration-200"
            >
              Register
            </a>
          </div>
        </div>
      </nav>

      <div className="px-16 pt-10 pb-6">
        <h1 className="font-lustria text-3xl text-taupe-800">
          Browse the collection
        </h1>
        <p className="text-taupe-500 text-sm mt-1">
          {books.length} titles available
        </p>
      </div>

      <div className="grid w-full px-16 pb-16 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {books.map((book) => (
          <div
            key={book.title}
            className="group flex flex-col w-full rounded-xl border border-taupe-100 shadow-sm bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex w-full h-44 items-center justify-center bg-taupe-50 px-4 py-3">
              <img
                src={book.img_link}
                className="h-full w-auto object-contain rounded-md shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 flex flex-col justify-center px-4 py-3 border-t border-taupe-100">
              <span className="font-lustria text-sm text-taupe-800 leading-snug line-clamp-2">
                {book.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
