
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageBooks from "./pages/ManageBooks";
import AddBook from "./pages/AddBook";
import AdminRequests from "./pages/AdminRequests";
import EmployeeBooks from "./pages/EmployeeBooks";
function ComingSoon({ title }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#161316] px-6 text-center text-white">
      <div className="mb-6 rounded-2xl bg-[#ff6d29]/15 p-5 text-[#ff8a55]">
        <Construction size={38} />
      </div>

      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="mt-3 text-[#bababa]">
        We're building this workspace. Stay tuned!
      </p>

      <Link
        to="/"
        className="mt-8 flex items-center gap-2 rounded-xl bg-[#ff6d29] px-6 py-3 font-semibold text-[#161316]"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/manage-books" element={<ManageBooks />} />
<Route path="/admin/add-book" element={<AddBook />} />
<Route
  path="/admin/requests"
  element={<AdminRequests />}
/>
<Route
  path="/employee/books"
  element={<EmployeeBooks />}
/>
        <Route
  path="/employee/dashboard"
  element={<Navigate to="/employee/books" replace />}
/>

        <Route
          path="*"
          element={<ComingSoon title="Page Not Found" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

