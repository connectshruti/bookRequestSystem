
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Search,
  RefreshCw,
  Layers3,
  UserRound,
  CalendarDays,
  Inbox,
} from "lucide-react";
import api from "../services/api";

export default function AdminRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const endpoint =
        selectedTechnology === "all"
          ? "/api/admin/requests"
          : `/api/admin/requests/technology/${selectedTechnology}`;

      const response = await api.get(endpoint);

      setRequests(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error("Request loading failed:", err);

      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        navigate("/admin/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.message ||
        "Unable to load book requests. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [selectedTechnology]);

  const filteredRequests = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) return requests;

    return requests.filter((request) =>
      [
        request.bookTitle,
        request.author,
        request.employeeId,
        request.technologyName,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(term)
      )
    );
  }, [requests, search]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "N/A";

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#161316] text-white">

      {/* Header */}
      <header className="h-20 px-5 md:px-9 flex items-center border-b border-white/5 bg-[#1D191B]">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white mr-4"
        >
          <ArrowLeft size={19} />
        </button>

        <div>
          <p className="text-xs text-gray-500">
            Admin / Requests
          </p>
          <h1 className="text-lg font-semibold">
            Book Requests
          </h1>
        </div>

        <button
          onClick={fetchRequests}
          disabled={loading}
          className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm text-gray-300 hover:bg-white/5 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-5 md:p-9">

        {/* Page heading */}
        <div className="mb-8">
          <p className="text-xs text-[#FF8249] tracking-[2px] font-semibold mb-2">
            REQUEST MANAGEMENT
          </p>

          <h2 className="text-2xl md:text-3xl font-bold">
            Employee Book Requests
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            View and manage book requests submitted by employees.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
          <div className="bg-[#201B1E] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Total Requests
                </p>
                <h3 className="text-3xl font-bold mt-3">
                  {requests.length}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#FF6D29]/15 text-[#FF8249] flex items-center justify-center">
                <Inbox size={23} />
              </div>
            </div>
          </div>

          <div className="bg-[#201B1E] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Displayed Requests
                </p>
                <h3 className="text-3xl font-bold mt-3">
                  {filteredRequests.length}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <BookOpen size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#201B1E] border border-white/5 rounded-2xl p-5 mb-6">
          <div className="grid md:grid-cols-2 gap-4">

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="Search title, author or employee ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-4 mb-5 text-sm">
            {error}
            <button
              onClick={fetchRequests}
              className="ml-3 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Requests table */}
        <div className="bg-[#201B1E] border border-white/5 rounded-2xl overflow-hidden">

          <div className="p-5 border-b border-white/5">
            <h3 className="font-semibold">
              All Employee Requests
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Book requests received from employees
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <RefreshCw
                size={25}
                className="animate-spin mx-auto mb-3"
              />
              Loading requests...
            </div>
          ) : !error && filteredRequests.length === 0 ? (
            <div className="py-20 text-center">
              <Inbox
                size={38}
                className="mx-auto mb-4 text-gray-600"
              />
              <h3 className="font-semibold text-gray-300">
                No requests found
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Try changing your search or technology filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">

                <thead className="bg-[#161316] text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4">Book Details</th>
                    <th className="px-6 py-4">Employee ID</th>
                    <th className="px-6 py-4">Technology</th>
                    <th className="px-6 py-4">Requested At</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="hover:bg-white/[0.025] transition"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FF6D29]/10 text-[#FF8249] flex items-center justify-center shrink-0">
                            <BookOpen size={19} />
                          </div>

                          <div>
                            <p className="font-semibold text-white">
                              {request.bookTitle}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {request.author}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-gray-300">
                        <div className="flex items-center gap-2">
                          <UserRound size={15} className="text-gray-500" />
                          {request.employeeId}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-3 py-1.5 rounded-lg bg-[#453027]/50 text-[#FFAD82] text-xs">
                          {request.technologyName}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-400 text-xs">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={15} />
                          {formatDate(request.requestedAt)}
                        </div>
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
