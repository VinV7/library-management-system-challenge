// Services
import return_book from "../../services/return_book";

function BorrowedBooksPanel({ borrowedBooks }) {

  const handleReturn = async (book) => {
    try {
      const result = await return_book({
        lending_id: book.id,
      });

      console.log("Return successful:", result);

      // You should refresh the borrowed books after this.
      // For now:
      console.log(`Book "${book.title}" returned successfully`);

    } catch (err) {
      console.error("Failed to return book:", err);
    }
  };

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

        <div className="px-6 py-5 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800">
            Borrowed Books
          </h2>

          <p className="text-sm text-neutral-400 mt-1">
            {borrowedBooks.length} borrowed book
            {borrowedBooks.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">

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

            <tbody>
              {borrowedBooks.map((book) => (
                <tr
                  key={book.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                >

                  <td className="px-6 py-4 text-sm text-neutral-500">
                    #{book.id}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-medium text-neutral-800">
                      {book.title}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {book.date_borrowed}
                  </td>

                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {book.due_date ?? "-"}
                  </td>

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
                      onClick={() => handleReturn(book)}
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