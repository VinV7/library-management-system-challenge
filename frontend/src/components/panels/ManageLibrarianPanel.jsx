const librarianList = [
  {
    id: 1,
    username: "admin",
    email: "admin@library.com",
    created_at: "2026-08-20",
  },
  {
    id: 2,
    username: "john_doe",
    email: "john@library.com",
    created_at: "2026-08-21",
  },
  {
    id: 3,
    username: "sarah_wilson",
    email: "sarah@library.com",
    created_at: "2026-08-22",
  },
  {
    id: 4,
    username: "michael_lee",
    email: "michael@library.com",
    created_at: "2026-08-23",
  },
  {
    id: 5,
    username: "emma_brown",
    email: "emma@library.com",
    created_at: "2026-08-24",
  },
];


function ManageLibrarianPanel() {
  return (
    <div className="flex flex-col flex-1 min-h-0 p-5 gap-5 bg-[#f8f8f3] overflow-y-auto">

      {/* Make Librarian */}
      <div className="w-full bg-white rounded-xl shadow-xl border border-neutral-200">

        {/* Header */}
        <div className="flex w-full px-6 py-5 items-center border-b border-neutral-200">
          <span className="text-xl font-semibold text-neutral-800">
            Make Librarian
          </span>
        </div>

        {/* Form */}
        <form className="grid grid-cols-3 gap-5 p-6">

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-600">
              Email
            </label>

            <input
              type="email"
              placeholder="librarian@example.com"
              className="
                w-full
                px-4 py-3
                rounded-lg
                border border-neutral-200
                outline-none
                text-sm
                focus:border-orange-400
                focus:ring-2 focus:ring-orange-100
              "
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-600">
              Username
            </label>

            <input
              type="text"
              placeholder="Username"
              className="
                w-full
                px-4 py-3
                rounded-lg
                border border-neutral-200
                outline-none
                text-sm
                focus:border-orange-400
                focus:ring-2 focus:ring-orange-100
              "
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-600">
              Password
            </label>

            <input
              type="password"
              placeholder="Password"
              className="
                w-full
                px-4 py-3
                rounded-lg
                border border-neutral-200
                outline-none
                text-sm
                focus:border-orange-400
                focus:ring-2 focus:ring-orange-100
              "
            />
          </div>

          {/* Submit */}
          <div className="col-span-3 flex justify-end">
            <button
              type="button"
              className="
                px-6 py-3
                rounded-lg
                bg-orange-400
                text-white
                font-medium
                text-sm
                hover:bg-orange-500
                active:bg-orange-600
                transition
              "
            >
              Make Librarian
            </button>
          </div>

        </form>
      </div>


      {/* Librarian Management */}
      <div className="flex flex-col flex-1 min-h-0 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden">

        {/* Header */}
        <div className="flex w-full px-6 py-5 items-center border-b border-neutral-200">
          <div>
            <span className="text-xl font-semibold text-neutral-800">
              Manage Librarians
            </span>

            <p className="text-sm text-neutral-400 mt-1">
              View and manage registered librarians
            </p>
          </div>
        </div>


        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">

            {/* Table Header */}
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr className="text-left text-sm text-neutral-500">

                <th className="px-6 py-4 font-medium">
                  ID
                </th>

                <th className="px-6 py-4 font-medium">
                  Username
                </th>

                <th className="px-6 py-4 font-medium">
                  Email
                </th>

                <th className="px-6 py-4 font-medium">
                  Date Created
                </th>

                <th className="px-6 py-4 font-medium text-right">
                  Action
                </th>

              </tr>
            </thead>


            {/* Table Body */}
            <tbody>
              {librarianList.map((librarian) => (
                <tr
                  key={librarian.id}
                  className="
                    border-b
                    border-neutral-100
                    hover:bg-neutral-50
                    transition
                  "
                >

                  {/* ID */}
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    #{String(librarian.id).padStart(3, "0")}
                  </td>


                  {/* Username */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-neutral-800">
                      {librarian.username}
                    </span>
                  </td>


                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-neutral-600">
                    {librarian.email}
                  </td>


                  {/* Date Created */}
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {new Date(
                      librarian.created_at
                    ).toLocaleDateString("en-GB")}
                  </td>


                  {/* Delete */}
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="
                        px-4 py-2
                        rounded-lg
                        bg-red-50
                        text-red-600
                        text-sm
                        font-medium
                        hover:bg-red-100
                        transition
                      "
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

export default ManageLibrarianPanel;