
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Users,
  LogOut,
  Plus,
  Search,
  Bell,
  ArrowUpRight,
  Library,
  Clock3,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import api from "../services/api";

const stats = [
  {
    title: "Total Books",
    value: "—",
    icon: BookOpen,
    description: "Books in your library",
  },
  {
    title: "Total Employees",
    value: "—",
    icon: Users,
    description: "Registered employees",
  },
  {
    title: "Pending Requests",
    value: "—",
    icon: Clock3,
    description: "Awaiting approval",
  },
  {
    title: "Approved Requests",
    value: "—",
    icon: CheckCircle2,
    description: "Successfully approved",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
const [bookCount, setBookCount] = useState(0);
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await api.get("/api/admin/auth/me");
        setAdmin(response.data);
        const booksResponse = await api.get("/api/admin/books");
setBookCount(booksResponse.data.length);
      } catch (error) {
        console.error("Session verification failed:", error);
        navigate("/admin/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await api.post("/api/admin/auth/logout");
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#161316] flex items-center justify-center text-[#FF6D29]">
        <div className="animate-spin rounded-full h-9 w-9 border-2 border-[#FF6D29] border-t-transparent" />
      </div>
    );
  }

  if (!admin) return null;

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "Manage Books", icon: BookOpen },
    { label: "Book Requests", icon: ClipboardList },
    { label: "Employees", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#161316] text-white flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#1D191B] border-r border-white/5 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-20 px-7 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6D29] flex items-center justify-center">
              <BookOpen size={23} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">BookHub</h1>
              <p className="text-[10px] text-[#BABABA] tracking-[2px] uppercase">
                Resource Center
              </p>
            </div>
          </div>
          <button
            className="lg:hidden text-gray-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>

        <div className="px-5 py-8">
          <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-4 px-3">
            Workspace
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setSidebarOpen(false);
                    if (item.label !== "Dashboard") {
                      navigate(
  item.label === "Manage Books"
    ? "/admin/manage-books"
    : item.label === "Book Requests"
      ? "/admin/requests"
      : "/admin/employees"
);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                    item.active
                      ? "bg-[#FF6D29] text-white shadow-lg shadow-orange-900/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                  {item.active && (
                    <ArrowUpRight size={16} className="ml-auto" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-5 border-t border-white/5">
          <div className="bg-[#292124] rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#453027] flex items-center justify-center text-[#FF8A50] font-bold">
                {(admin.username || "A")[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">
                  {admin.username}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-red-400 transition disabled:opacity-50"
          >
            <LogOut size={18} />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-20 px-5 md:px-9 flex items-center justify-between border-b border-white/5 bg-[#1D191B]/70">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-400"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={23} />
            </button>
            <div>
              <p className="text-sm text-gray-500">Workspace / Overview</p>
              <h2 className="font-semibold text-lg">Dashboard</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white">
              <Bell size={18} />
            </button>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{admin.username}</p>
              <p className="text-xs text-gray-500">Admin account</p>
            </div>
          </div>
        </header>

        <div className="p-5 md:p-9 max-w-[1500px] mx-auto">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#453027] to-[#292023] border border-[#68412E]/40 p-7 md:p-10 mb-8"
          >
            <div className="relative z-10 max-w-xl">
              <p className="text-[#FF9A69] text-sm font-medium mb-3">
                ADMINISTRATOR PANEL
              </p>
              <h1 className="text-2xl md:text-4xl font-bold mb-3">
                Welcome back, {admin.username}!
              </h1>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Manage your organization's book library, track employee
                requests, and keep your resources organized.
              </p>
              <button
                onClick={() => navigate("/admin/add-book")}
                className="mt-6 bg-[#FF6D29] hover:bg-[#ff8147] text-white px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition"
              >
                <Plus size={18} />
                Add New Book
              </button>
            </div>
            <Library
              size={190}
              className="absolute -right-5 -bottom-10 text-white/5 rotate-[-15deg]"
            />
          </motion.div>

          {/* Statistics */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-semibold">Library Overview</h3>
              <p className="text-sm text-gray-500 mt-1">
                Your platform at a glance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-9">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#201B1E] border border-white/5 rounded-2xl p-5 hover:border-[#FF6D29]/40 transition"
                >
                  <div className="flex justify-between items-center mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#453027]/60 flex items-center justify-center text-[#FF8249]">
                      <Icon size={21} />
                    </div>
                    <ArrowUpRight size={17} className="text-gray-600" />
                  </div>
                  <p className="text-3xl font-bold">
  {stat.title === "Total Books" ? bookCount : stat.value}
</p>
                  <p className="text-sm font-medium mt-2">{stat.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Quick actions */}
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/admin/add-book")}
              className="group text-left bg-[#201B1E] border border-white/5 hover:border-[#FF6D29]/40 rounded-2xl p-6 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#453027]/60 flex items-center justify-center text-[#FF8249] mb-4">
                    <Plus size={22} />
                  </div>
                  <h4 className="font-semibold">Add a New Book</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Expand your organization's library
                  </p>
                </div>
                <ArrowUpRight className="text-gray-600 group-hover:text-[#FF6D29] transition" />
              </div>
            </button>
            <button
              onClick={() => navigate("/admin/requests")}
              className="group text-left bg-[#201B1E] border border-white/5 hover:border-[#FF6D29]/40 rounded-2xl p-6 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#453027]/60 flex items-center justify-center text-[#FF8249] mb-4">
                    <ClipboardList size={22} />
                  </div>
                  <h4 className="font-semibold">Review Book Requests</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage employee book requests
                  </p>
                </div>
                <ArrowUpRight className="text-gray-600 group-hover:text-[#FF6D29] transition" />
              </div>
            </button>
          </div>

          <p className="text-center text-xs text-gray-600 mt-12">
            BookHub · Internal Resource Center
          </p>
        </div>
      </main>
    </div>
  );
}
