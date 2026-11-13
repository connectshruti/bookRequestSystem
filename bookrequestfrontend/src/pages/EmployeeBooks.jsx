
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  Layers3,
  IndianRupee,
  Send,
  RefreshCw,
  X,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";
import api from "../services/api";

const initialForm = {
  bookTitle: "",
  author: "",
  employeeId: "",
  technologyId: "",
};

export default function EmployeeBooks() {
  const [books, setBooks] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  const [selectedTechnology, setSelectedTechnology] =
    useState("all");

  const [search, setSearch] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load technologies
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await api.get("/api/technologies");

        setTechnologies(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (err) {
        console.error("Technology loading failed:", err);
      }
    };

    fetchTechnologies();
  }, []);

  // Load books based on selected technology
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const endpoint =
        selectedTechnology === "all"
          ? "/api/employee/books"
          : `/api/employee/books/technology/${selectedTechnology}`;

      const response = await api.get(endpoint);

      setBooks(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error("Book loading failed:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load books. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [selectedTechnology]);

  // Search books
  const filteredBooks = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) return books;

    return books.filter((book) =>
      [
        book.title,
        book.author,
        book.technologyName,
        book.status,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(term)
      )
    );
  }, [books, search]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Submit book request
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.bookTitle.trim() ||
      !form.author.trim() ||
      !form.employeeId ||
      !form.technologyId
    ) {
      setError("Please complete all fields.");
      return;
    }

    const employeeId = Number(form.employeeId);

    if (!Number.isInteger(employeeId) || employeeId <= 0) {
      setError("Enter a valid positive Employee ID.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        bookTitle: form.bookTitle.trim(),
        author: form.author.trim(),
        employeeId,
        technologyId: Number(form.technologyId),
      };

      const response = await api.post(
        "/api/employee/requests",
        payload
      );

      setSuccess(
        response.data?.message ||
        "Your book request was submitted successfully!"
      );

      setForm(initialForm);
    } catch (err) {
      console.error("Book request failed:", err);

      setError(
        err.response?.data?.message ||
        "Unable to submit your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusStyle = (status) => {
    if (String(status).toUpperCase() === "AVAILABLE") {
      return "bg-green-500/10 text-green-400 border-green-500/20";
    }

    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  };

  return (
    <div className="min-h-screen bg-[#161316] text-white">

      {/* Navbar */}
      <header className="h-20 px-5 md:px-9 flex items-center justify-between border-b border-white/5 bg-[#1D191B]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl orange-gradient flex items-center justify-center">
            <BookOpen size={21} />
          </div>

          <div>
            <h1 className="font-bold text-lg">BookHub</h1>
            <p className="text-xs text-gray-500">
              Employee Library
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setShowRequestForm(!showRequestForm);
            setError("");
            setSuccess("");
          }}
          className="flex items-center gap-2 bg-[#FF6D29] hover:bg-[#ff8147] px-4 py-2.5 rounded-xl text-sm font-semibold transition"
        >
          {showRequestForm ? (
            <X size={17} />
          ) : (
            <Plus size={17} />
          )}

          {showRequestForm ? "Close Form" : "Request a Book"}
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-5 md:p-9">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-xs text-[#FF8249] tracking-[2px] font-semibold mb-2">
            YOUR LEARNING LIBRARY
          </p>

          <h2 className="text-3xl font-bold">
            Explore Books
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Discover learning resources and request books
            that support your growth.
          </p>
        </div>

        {/* Request Form */}
        {showRequestForm && (
          <div className="bg-[#201B1E] border border-white/5 rounded-2xl p-6 md:p-8 mb-9">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#FF6D29]/15 text-[#FF8249] flex items-center justify-center">
                <Send size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Request a New Book
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Submit your book requirements to the admin.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex gap-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm flex gap-2">
                <CheckCircle2 size={18} />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Book Title
                  </label>

                  <input
                    name="bookTitle"
                    value={form.bookTitle}
                    onChange={handleChange}
                    placeholder="e.g. Effective Java"
                    maxLength={200}
                    className="w-full bg-[#161316] border border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-[#FF6D29]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Author
                  </label>

                  <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="e.g. Joshua Bloch"
                    maxLength={150}
                    className="w-full bg-[#161316] border border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-[#FF6D29]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Employee ID
                  </label>

                  <input
                    type="number"
                    name="employeeId"
                    value={form.employeeId}
                    onChange={handleChange}
                    placeholder="Enter your employee ID"
                    min="1"
                    step="1"
                    className="w-full bg-[#161316] border border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-[#FF6D29]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Technology
                  </label>

                  <select
                    name="technologyId"
                    value={form.technologyId}
                    onChange={handleChange}
                    className="w-full bg-[#161316] border border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-[#FF6D29]"
                    required
                  >
                    <option value="">Select Technology</option>

                    {technologies.map((technology) => (
                      <option
                        key={technology.id}
                        value={technology.id}
                      >
                        {technology.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="flex justify-end mt-7">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 bg-[#FF6D29] hover:bg-[#ff8147] disabled:opacity-50 px-6 py-3 rounded-xl text-sm font-semibold"
                >
                  <Send size={17} />
                  {submitting
                    ? "Submitting..."
                    : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Book search and filter */}
        <div className="bg-[#201B1E] border border-white/5 rounded-2xl p-5 mb-7">
          <div className="grid md:grid-cols-2 gap-4">

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books or authors..."
                className="w-full bg-[#161316] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#FF6D29]"
              />
            </div>

            <div className="relative">
              <Layers3
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />

              <select
                value={selectedTechnology}
                onChange={(e) =>
                  setSelectedTechnology(e.target.value)
                }
                className="w-full appearance-none bg-[#161316] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#FF6D29]"
              >
                <option value="all">All Technologies</option>

                {technologies.map((technology) => (
                  <option
                    key={technology.id}
                    value={technology.id}
                  >
                    {technology.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Book count */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-lg">
              Available Library Resources
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {filteredBooks.length} books displayed
            </p>
          </div>

          <button
            onClick={fetchBooks}
            disabled={loading}
            className="p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white"
            title="Refresh books"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>

        {/* Errors */}
        {error && !showRequestForm && (
          <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <RefreshCw
              size={28}
              className="animate-spin mx-auto mb-3"
            />
            Loading library...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-gray-400">
            Unable to display books.
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="py-20 text-center bg-[#201B1E] rounded-2xl border border-white/5">
            <BookOpen
              size={40}
              className="mx-auto mb-4 text-gray-600"
            />

            <h3 className="font-semibold">
              No books found
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Try another search or request a new book.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-[#201B1E] border border-white/5 rounded-2xl p-6 hover:border-[#FF6D29]/40 transition"
              >
                <div className="flex items-start justify-between mb-5">

                  <div className="w-12 h-12 rounded-xl bg-[#FF6D29]/10 text-[#FF8249] flex items-center justify-center">
                    <BookOpen size={23} />
                  </div>

                  <span
                    className={`text-xs px-3 py-1.5 rounded-lg border ${getStatusStyle(book.status)}`}
                  >
                    {String(book.status || "UNKNOWN")
                      .replaceAll("_", " ")}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-2">
                  {book.title}
                </h3>

                <p className="text-sm text-gray-500 mb-5">
                  by {book.author}
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 gap-3">

                  <span className="text-xs text-[#FFAD82] bg-[#453027]/50 px-3 py-1.5 rounded-lg">
                    {book.technologyName}
                  </span>

                  <span className="text-sm font-semibold flex items-center text-gray-300">
                    <IndianRupee size={14} />
                    {book.price}
                  </span>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center border-t border-white/5 pt-7">
          <p className="text-xs text-gray-600">
            BookHub — Your Learning, Our Library.
          </p>
        </div>

      </main>
    </div>
  );
}
