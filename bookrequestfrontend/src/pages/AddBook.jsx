
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Plus,
  CheckCircle2,
  AlertCircle,
  Layers3,
  UserRound,
  IndianRupee,
} from "lucide-react";
import api from "../services/api";

const initialForm = {
  title: "",
  author: "",
  price: "",
  technologyId: "",
};

export default function AddBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [technologies, setTechnologies] = useState([]);
  const [loadingTechnologies, setLoadingTechnologies] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await api.get("/api/technologies");
        setTechnologies(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Unable to load technologies:", err);

        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/admin/login", { replace: true });
          return;
        }

        setError("Unable to load technologies. Please refresh the page.");
      } finally {
        setLoadingTechnologies(false);
      }
    };

    fetchTechnologies();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim() || !form.author.trim() ||
        !form.price || !form.technologyId) {
      setError("Please complete all fields.");
      return;
    }

    const price = Number(form.price);

    if (!Number.isFinite(price) || price <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        title: form.title.trim(),
        author: form.author.trim(),
        price,
        technologyId: Number(form.technologyId),
      };

      await api.post("/api/admin/books", payload);

      setSuccess("Book added successfully!");
      setForm(initialForm);
    } catch (err) {
      console.error("Add book failed:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/admin/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.message ||
        "Unable to add book. Please check your details and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#161316] text-white">
      <header className="h-20 px-5 md:px-9 flex items-center border-b border-white/5 bg-[#1D191B]">
        <button
          onClick={() => navigate("/admin/manage-books")}
          className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white mr-4"
        >
          <ArrowLeft size={19} />
        </button>
        <div>
          <p className="text-xs text-gray-500">Admin / Library / Add Book</p>
          <h1 className="text-lg font-semibold">Add New Book</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-5 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-xs text-[#FF8249] tracking-[2px] font-semibold mb-2">
            EXPAND YOUR LIBRARY
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Add a new resource
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter the book details to make it available in your organization.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#201B1E] border border-white/5 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-xl bg-[#453027]/60 flex items-center justify-center text-[#FF8249]">
                <BookOpen size={21} />
              </div>
              <div>
                <h3 className="font-semibold">Book Information</h3>
                <p className="text-xs text-gray-500 mt-1">
                  All fields are required
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex gap-2">
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm flex gap-2">
                <CheckCircle2 size={18} className="shrink-0" />
                {success}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Book Title
                </label>
                <div className="relative">
                  <BookOpen
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Clean Code"
                    maxLength={200}
                    className="w-full bg-[#161316] border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm outline-none focus:border-[#FF6D29]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Author
                </label>
                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="e.g. Robert C. Martin"
                    maxLength={150}
                    className="w-full bg-[#161316] border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm outline-none focus:border-[#FF6D29]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Price (₹)
                </label>
                <div className="relative">
                  <IndianRupee
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. 499"
                    min="0.01"
                    step="0.01"
                    className="w-full bg-[#161316] border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm outline-none focus:border-[#FF6D29]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Technology
                </label>
                <div className="relative">
                  <Layers3
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                  <select
                    name="technologyId"
                    value={form.technologyId}
                    onChange={handleChange}
                    disabled={loadingTechnologies || technologies.length === 0}
                    className="w-full appearance-none bg-[#161316] border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm outline-none focus:border-[#FF6D29] disabled:opacity-50"
                    required
                  >
                    <option value="">
                      {loadingTechnologies
                        ? "Loading technologies..."
                        : technologies.length
                          ? "Select a technology"
                          : "No technologies found"}
                    </option>
                    {technologies.map((technology) => (
                      <option key={technology.id} value={technology.id}>
                        {technology.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => navigate("/admin/manage-books")}
                className="px-5 py-3 rounded-xl border border-white/10 text-sm text-gray-300 hover:bg-white/5 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting || loadingTechnologies || technologies.length === 0}
                className="flex-1 bg-[#FF6D29] hover:bg-[#ff8147] disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <Plus size={18} />
                {submitting ? "Adding Book..." : "Add Book to Library"}
              </button>
            </div>
          </motion.form>

          <div className="space-y-5">
            <div className="rounded-2xl p-6 bg-gradient-to-br from-[#453027] to-[#241D1D] border border-[#68412E]/30">
              <div className="w-12 h-12 rounded-xl bg-[#FF6D29]/15 text-[#FF8249] flex items-center justify-center mb-5">
                <BookOpen size={24} />
              </div>
              <h3 className="font-semibold text-lg">Library Resource</h3>
              <p className="text-sm text-gray-300 leading-relaxed mt-2">
                New books are added with AVAILABLE status by default and can
                immediately be viewed in the library.
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-[#201B1E] border border-white/5">
              <h3 className="font-semibold text-sm mb-3">Before submitting</h3>
              <ul className="space-y-3 text-xs text-gray-400">
                <li>• Enter the correct book title.</li>
                <li>• Verify the author's name.</li>
                <li>• Enter a price greater than zero.</li>
                <li>• Select the correct technology.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
