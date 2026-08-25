const borrowedBooks = [
  {
    lending_id: 1001,
    book_title: "The Lord of the Rings",
    status: "Borrowed",
    fines: 0,
    borrow_date: "2026-08-20",
    due_date: "2026-09-03",
  },
  {
    lending_id: 1002,
    book_title: "Clean Code",
    status: "Overdue",
    fines: 15000,
    borrow_date: "2026-08-10",
    due_date: "2026-08-24",
  },
  {
    lending_id: 1003,
    book_title: "The Pragmatic Programmer",
    status: "Borrowed",
    fines: 0,
    borrow_date: "2026-08-21",
    due_date: "2026-09-04",
  },
  {
    lending_id: 1004,
    book_title: "Harry Potter and the Philosopher's Stone",
    status: "Overdue",
    fines: 25000,
    borrow_date: "2026-08-05",
    due_date: "2026-08-19",
  },
  {
    lending_id: 1005,
    book_title: "Atomic Habits",
    status: "Borrowed",
    fines: 0,
    borrow_date: "2026-08-22",
    due_date: "2026-09-05",
  },
  {
    lending_id: 1006,
    book_title: "The Great Gatsby",
    status: "Borrowed",
    fines: 0,
    borrow_date: "2026-08-23",
    due_date: "2026-09-06",
  },
];

function BorrowedBooksPanel() {
  if (!borrowedBooks || borrowedBooks.length === 0) {
    return (
      <div className="flex flex-1 w-full p-5 min-h-0 bg-[#f8f8f3]">
        <div className="flex w-full h-full bg-white rounded-xl shadow-xl border border-neutral-200 justify-center items-center">
          <span className="text-2xl text-neutral-400">
            No Borrowed Books Found
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 w-full p-5 min-h-0 bg-[#f8f8f3]">
      <div className="flex flex-col w-full h-full bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800">
            Borrowed Books
          </h2>

          <p className="text-sm text-neutral-400 mt-1">
            {borrowedBooks.length} borrowed book
            {borrowedBooks.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">

            {/* Table Header */}
            <thead className="sticky top-0 bg-neutral-50 border-b border-neutral-200">
              <tr className="text-left text-sm text-neutral-500">

                <th className="px-6 py-4 font-medium">
                  Lending ID
                </th>

                <th className="px-6 py-4 font-medium">
                  Book Title
                </th>

                <th className="px-6 py-4 font-medium">
                  Borrow Date
                </th>

                <th className="px-6 py-4 font-medium">
                  Due Date
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>

                <th className="px-6 py-4 font-medium">
                  Fines
                </th>

                <th className="px-6 py-4 font-medium text-right">
                  Action
                </th>

              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {borrowedBooks.map((book) => (
                <tr
                  key={book.lending_id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                >

                  {/* Lending ID */}
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    #{book.lending_id}
                  </td>

                  {/* Book Title */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-neutral-800">
                      {book.book_title}
                    </span>
                  </td>

                  {/* Borrow Date */}
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {book.borrow_date}
                  </td>

                  {/* Return Date */}
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {book.due_date ?? "-"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`
                        inline-flex
                        items-center
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${
                          book.status === "Overdue"
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                        }
                      `}
                    >
                      {book.status}
                    </span>
                  </td>

                  {/* Fines */}
                  <td className="px-6 py-4">
                    <span
                      className={
                        book.fines > 0
                          ? "text-red-600 font-medium"
                          : "text-neutral-500"
                      }
                    >
                      Rp {book.fines.toLocaleString("id-ID")}
                    </span>
                  </td>

                  {/* Return */}
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="
                        px-4
                        py-2
                        rounded-lg
                        bg-neutral-900
                        text-white
                        text-sm
                        font-medium
                        hover:bg-neutral-700
                        transition
                      "
                      onClick={() =>
                        console.log("Return:", book.lending_id)
                      }
                    >
                      Return
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default BorrowedBooksPanel;