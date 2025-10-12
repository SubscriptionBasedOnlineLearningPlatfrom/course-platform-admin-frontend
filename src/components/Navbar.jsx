import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data (if any)
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white px-6 py-3 shadow-lg">
      <div className="flex space-x-4">
        <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
        <Link to="/users" className="hover:text-blue-300">Users</Link>
        <Link to="/admin/courses" className="hover:text-blue-300">Courses</Link>
        <Link to="/admin/analytics" className="hover:text-blue-300">Analytics</Link>
        <Link to="/view-payment" className="hover:text-blue-300">Payments</Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
