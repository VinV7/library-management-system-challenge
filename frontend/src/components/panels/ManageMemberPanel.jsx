const memberList = [
  {
    id: 1,
    name: "John Doe",
    created_at: "2026-08-20",
    borrowed_books: 2,
  },
  {
    id: 2,
    name: "Jane Smith",
    created_at: "2026-08-21",
    borrowed_books: 5,
  },
  {
    id: 3,
    name: "Michael Brown",
    created_at: "2026-08-22",
    borrowed_books: 0,
  },
  {
    id: 1,
    name: "John Doe",
    created_at: "2026-08-20",
    borrowed_books: 2,
  },
  {
    id: 2,
    name: "Jane Smith",
    created_at: "2026-08-21",
    borrowed_books: 5,
  },
  {
    id: 3,
    name: "Michael Brown",
    created_at: "2026-08-22",
    borrowed_books: 0,
  },
  {
    id: 1,
    name: "John Doe",
    created_at: "2026-08-20",
    borrowed_books: 2,
  },
  {
    id: 2,
    name: "Jane Smith",
    created_at: "2026-08-21",
    borrowed_books: 5,
  },
  {
    id: 3,
    name: "Michael Brown",
    created_at: "2026-08-22",
    borrowed_books: 0,
  },
];

function ManageMemberPanel() {
  // Variable Components

  if (!memberList || memberList.length === 0) {
    return (
      <div className="flex flex-1 w-full p-5 min-h-0 bg-[#f8f8f3]">
        <div className="flex w-full h-full bg-white rounded-xl shadow-xl border border-neutral-200 justify-center items-center">
          <span className="text-2xl text-neutral-400">No Member Found</span>fdhsahhdahll
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 w-full p-5 min-h-0 bg-[#f8f8f3]">
      <div className="flex flex-col w-full h-full bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-200">
          <h2 className="">
            Manage Members
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            {memberList.length} member{memberList.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-neutral-50 border-b border-neutral-200">
              <tr className="text-left text-sm text-neutral-500">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Date Created</th>
                <th className="px-6 py-4 font-medium">Books Borrowed</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {memberList.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                >
                  {/* ID */}
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {member.id}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-neutral-800">
                      {member.name}
                    </span>
                  </td>

                  {/* Date Created */}
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {member.created_at}
                  </td>

                  {/* Books Borrowed */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 text-sm text-neutral-700">
                      {member.borrowed_books}
                    </span>
                  </td>

                  {/* Delete */}
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition"
                      onClick={() => console.log("Delete:", member.id)}
                    >
                      Delete
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

export default ManageMemberPanel;
