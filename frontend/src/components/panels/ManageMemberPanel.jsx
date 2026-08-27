// Main Import
import { useState } from "react";

// Services
import delete_user from "../../services/delete_user";

function ManageMemberPanel({ members, onDelete }) {
  // Variable Components
  const [deleteError, setDeleteError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeleteError("");
    setDeletingId(id);

    try {
      await delete_user({ id });
      onDelete?.(id);
    } catch (err) {
      console.log(err);
      setDeleteError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete member. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (!members || members.length === 0) {
    return (
      <div className="flex flex-1 w-full p-5 min-h-0 bg-[#f8f8f3]">
        <div className="flex w-full h-full bg-white rounded-xl shadow-xl border border-neutral-200 justify-center items-center">
          <span className="text-2xl text-neutral-400">No Member Found</span>
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
            {members.length} member{members.length !== 1 ? "s" : ""}
          </p>
        </div>

        {deleteError && (
          <div className="mx-6 mt-4 flex items-start gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            <span>{deleteError}</span>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-neutral-50 border-b border-neutral-200">
              <tr className="text-left text-sm text-neutral-500">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
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

                  <td className="px-6 py-4">
                    <span className="font-medium text-neutral-800">
                      {member.email}
                    </span>
                  </td>

                  {/* Delete */}
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      disabled={deletingId === member.id}
                      className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={() => handleDelete(member.id)}
                    >
                      {deletingId === member.id ? "Deleting..." : "Delete"}
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