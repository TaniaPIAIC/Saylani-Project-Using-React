import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { Menu, X, LogOut } from "lucide-react";
import logo from "../assets/favicon/smit-logo.png";

const Navbar = ({ menuItems = [] }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultMenuItems = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
  ];

  const authLinks = !isAuthenticated
    ? [
        { label: "Student Signup", path: "/student-signup" },
        { label: "Student Login", path: "/student-login" },
        { label: "Teacher Login", path: "/teacher-login" },
      ]
    : [];

  const navItems = !isAuthenticated && menuItems.length > 0 ? menuItems : defaultMenuItems;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="SMIT" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path || "/"}
                className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                {userType === "student" && (
                  <>
                    <Link
                      to="/my-applications"
                      className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                      Applications
                    </Link>
                    <Link
                      to="/student-leaves"
                      className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                      Leave Requests
                    </Link>
                  </>
                )}

                {userType === "teacher" && (
                  <>
                    <Link
                      to="/teacher/manage-students"
                      className="text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                      Students
                    </Link>
                    <Link
                      to="/teacher/manage-courses"
                      className="text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                      Courses
                    </Link>
                    <Link
                      to="/teacher/manage-leaves"
                      className="text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                      Leaves
                    </Link>
                    <Link
                      to="/teacher/manage-teachers"
                      className="text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                      Teachers
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              authLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  {item.label}
                </Link>
              ))
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path || "/"}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                {userType === "student" && (
                  <>
                    <Link
                      to="/courses"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Courses
                    </Link>
                    <Link
                      to="/my-applications"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Applications
                    </Link>
                    <Link
                      to="/student-leaves"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Leave Requests
                    </Link>
                  </>
                )}

                {userType === "teacher" && (
                  <>
                    <Link
                      to="/teacher/manage-students"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Students
                    </Link>
                    <Link
                      to="/teacher/manage-courses"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Courses
                    </Link>
                    <Link
                      to="/teacher/manage-leaves"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Leaves
                    </Link>
                    <Link
                      to="/teacher/manage-teachers"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Teachers
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition mt-2 cursor-pointer"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              authLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="cursor-pointer block text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item.label}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
