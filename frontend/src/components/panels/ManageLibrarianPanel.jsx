// Main import
import { useState } from "react";
import register from "../../services/register_librarian";

// Service
import delete_user from "../../services/delete_user";

function ManageLibrarianPanel({ librarians = [], onDelete }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [deleteError, setDeleteError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      await register({
        email: email,
        username: username,
        password: password,
      });
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong while creating the librarian. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
        "Failed to delete librarian. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 p-5 gap-5 bg-[#f8f8f3] overflow-y-auto">

      <div className="w-full bg-white rounded-xl shadow-xl border border-neutral-200">

        <div className="flex w-full px-6 py-5 items-center border-b border-neutral-200">
          <span className="text-xl font-semibold text-neutral-800">
            Make Librarian
          </span>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-3 gap-5 p-6">

          {error && (
            <div className="col-span-3 flex items-start gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-600">
              Email
            </label>
            <input
              type="email"
              placeholder="librarian@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 outline-none text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-600">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 outline-none text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 outline-none text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-lg bg-orange-400 text-white font-medium text-sm hover:bg-orange-500 active:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating..." : "Make Librarian"}
            </button>
          </div>

        </form>
      </div>

      <div className="flex flex-col flex-1 min-h-0 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden">

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

        {deleteError && (
          <div className="mx-6 mt-4 flex items-start gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            <span>{deleteError}</span>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr className="text-left text-sm text-neutral-500">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Username</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {librarians.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-400 text-sm">
                    No librarians yet
                  </td>
                </tr>
              ) : (
                librarians.map((librarian) => (
                  <tr
                    key={librarian.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                  >
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      #{String(librarian.id).padStart(3, "0")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-neutral-800">
                        {librarian.username}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {librarian.email}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(librarian.id)}
                        disabled={deletingId === librarian.id}
                        className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {deletingId === librarian.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default ManageLibrarianPanel;