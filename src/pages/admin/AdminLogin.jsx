import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import { getAdminByUsername } from "../../firebase/services";
import { verifyPassword } from "../../utils/helpers";
import Navbar from "../../components/Navbar";

const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "admin123";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(loginStart());
    setLoading(true);

    try {
      const admin = await getAdminByUsername(formData.username);

      if (!admin) {
        if (
          formData.username === DEFAULT_ADMIN_USERNAME &&
          formData.password === DEFAULT_ADMIN_PASSWORD
        ) {
          dispatch(
            loginSuccess({
              user: {
                id: "default-admin",
                username: DEFAULT_ADMIN_USERNAME,
                name: "Teacher",
              },
              userType: "teacher",
            })
          );
          navigate("/teacher-dashboard");
          return;
        }

        throw { code: "admin/not-found", message: "Teacher not found" };
      }

      // Verify password
      if (!verifyPassword(formData.password, admin.password)) {
        throw { code: "admin/invalid-password", message: "Invalid password" };
      }

      dispatch(
        loginSuccess({
          user: {
            id: admin.id,
            username: admin.username,
            name: admin.name,
          },
          userType: "teacher",
        })
      );
      navigate("/teacher-dashboard");
    } catch (error) {
      const errorMessage =
        error.code === "admin/not-found"
          ? "Admin account not found"
          : error.code === "admin/invalid-password"
          ? "Invalid password"
          : error.message || "An error occurred";
      dispatch(loginFailure(errorMessage));
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-20">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Teacher Login
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Access the teacher dashboard
          </p>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            Default admin credentials:
            <span className="font-semibold text-gray-900"> admin / admin123</span>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Are you a student?{" "}
            <Link to="/student-login" className="text-blue-600 font-semibold hover:underline">
              Student Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
