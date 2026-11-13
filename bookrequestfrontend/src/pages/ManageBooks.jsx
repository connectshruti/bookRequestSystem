
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Search,
  Trash2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Layers3,
} from "lucide-react";
import api from "../services/api";

export default function ManageBooks() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/admin/books");
      setBooks(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Unable to fetch books:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/admin/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.message ||
        "Could not load books. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return books;

    return books.filter((book) =>
      [
        book.title,
        book.author,
        book.technologyName,
        book.status,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [books, search]);

  const handleDelete = async (book) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(book.id);
      await api.delete(`/api/admin/books/${book.id}`);

      setBooks((previous) =>
        previous.filter((item) => item.id !== book.id)
      );
    } catch (err) {
      console.error("Book deletion failed:", err);
      alert(
        err.response?.data?.message ||
        "Unable to delete this book. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#161316] text-white">
      <header className="h-20 px-5 md:px-9 flex items-center justify-between border-b border-white/5 bg-[#1D191B]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"
          >
            <ArrowLeft size={19} />
          </button>
          <div>
            <p className="text-xs text-gray-500">Admin / Library</p>
            <h1 className="text-lg font-semibold">Manage Books</h1>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin/add-book")}
          className="bg-[#FF6D29] hover:bg-[#ff8147] px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold transition"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Book</span>
        </button>
      </header>

      <main className="max-w-[1400px] mx-auto p-5 md:p-9">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-[#FF8249] text-xs font-semibold tracking-[2px] mb-2">
            YOUR ORGANIZATION'S LIBRARY
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Books Collection
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            View and manage all books available in BookHub.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
          <div className="bg-[#201B1E] border border-white/5 rounded-2xl p-5">
            <BookOpen className="text-[#FF8249] mb-3" size={22} />
            <p className="text-2xl font-bold">{books.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total Books</p>
          </div>

          <div className="bg-[#201B1E] border border-white/5 rounded-2xl p-5">
            <CheckCircle2 className="text-green-400 mb-3" size={22} />
            <p className="text-2xl font-bold">
              {books.filter((b) => b.status === "AVAILABLE").length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Available</p>
          </div>

          <div className="bg-[#201B1E] border border-white/5 rounded-2xl p-5">
            <XCircle className="text-red-400 mb-3" size={22} />
            <p className="text-2xl font-bold">
              {books.filter((b) => b.status === "NOT_AVAILABLE").length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Not Available</p>
          </div>
        </div>

        <div className="bg-[#201B1E] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 md:p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">All Books</h3>
              <p className="text-xs text-gray-500 mt-1">
                {filteredBooks.length} result(s)
              </p>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-72">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search title, author, technology..."
                  className="w-full bg-[#161316] border border-white/10 rounded-xl py-3 pl-10 pr-3 text-sm outline-none focus:border-[#FF6D29]"
                />
              </div>

              <button
                onClick={fetchBooks}
                disabled={loading}
                className="w-11 h-11 shrink-0 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                title="Refresh books"
              >
                <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          {error && (
            <div className="m-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
              {error}
              <button
                onClick={fetchBooks}
                className="underline ml-2"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="py-20 flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-[#FF6D29] border-t-transparent animate-spin" />
            </div>
          ) : !error && filteredBooks.length === 0 ? (
            <div className="py-20 text-center">
              <Layers3 size={35} className="mx-auto text-gray-600 mb-3" />
              <p className="font-medium">
                {books.length === 0 ? "No books added yet" : "No matching books"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {books.length === 0
                  ? "Add your first book to get started."
                  : "Try another search term."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[750px]">
                <thead className="bg-[#191619] text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Book</th>
                    <th className="px-6 py-4">Technology</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#453027]/60 flex items-center justify-center text-[#FF8249]">
                            <BookOpen size={19} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{book.title}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {book.author}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-300">
                        {book.technologyName || "—"}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-300">
                        ₹{book.price}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                            book.status === "AVAILABLE"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {book.status === "AVAILABLE"
                            ? "Available"
                            : "Not Available"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => handleDelete(book)}
                          disabled={deletingId === book.id}
                          title="Delete book"
                          className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-40 transition"
                        >
                          {deletingId === book.id ? (
                            <RefreshCw size={17} className="animate-spin" />
                          ) : (
                            <Trash2 size={17} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
