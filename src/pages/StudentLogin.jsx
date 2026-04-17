import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/slices/authSlice";
import {
  loginStudent,
  signInWithGoogle,
  signInWithGithub,
  logout,
} from "../firebase/auth";
import { getStudentByEmail, updateStudent } from "../firebase/services";
import { validateEmail } from "../utils/helpers";
import Navbar from "../components/Navbar";
import logo from "../assets/favicon/smit-logo.png";

const StudentLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
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
      const user = await loginStudent(formData.email, formData.password);
      dispatch(
        loginSuccess({
          user: { uid: user.uid, email: user.email, name: user.displayName },
          userType: "student",
        })
      );
      navigate("/student-dashboard");
    } catch (error) {
      const errorMessage =
        error.code === "auth/user-not-found"
          ? "User not found"
          : error.code === "auth/wrong-password"
          ? "Invalid password"
          : error.message;
      dispatch(loginFailure(errorMessage));
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    dispatch(loginStart());
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      const studentRecord = await getStudentByEmail(user.email);
      if (!studentRecord) {
        await logout();
        throw new Error(
          "Your Google account is not registered for portal access. Please ask admin to add you first."
        );
      }
      await updateStudent(studentRecord.id, {
        uid: user.uid,
        provider: "google",
        fullName: user.displayName || studentRecord.fullName,
        email: user.email,
      });
      dispatch(
        loginSuccess({
          user: {
            uid: user.uid,
            email: user.email,
            name: user.displayName || studentRecord.fullName,
          },
          userType: "student",
        })
      );
      navigate("/student-dashboard");
    } catch (error) {
      const errorMessage = error.message || "Google sign-in failed";
      dispatch(loginFailure(errorMessage));
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    dispatch(loginStart());
    setLoading(true);
    try {
      const user = await signInWithGithub();
      const studentRecord = await getStudentByEmail(user.email);
      if (!studentRecord) {
        await logout();
        throw new Error(
          "Your GitHub account is not registered for portal access. Please ask admin to add you first."
        );
      }
      await updateStudent(studentRecord.id, {
        uid: user.uid,
        provider: "github",
        fullName: user.displayName || studentRecord.fullName,
        email: user.email,
      });
      dispatch(
        loginSuccess({
          user: {
            uid: user.uid,
            email: user.email,
            name: user.displayName || studentRecord.fullName,
          },
          userType: "student",
        })
      );
      navigate("/student-dashboard");
    } catch (error) {
      const errorMessage = error.message || "GitHub sign-in failed";
      dispatch(loginFailure(errorMessage));
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-20">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
          <img
            src={logo}
            alt="SMIT Logo"
            className="h-20 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Student Login
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter your credentials to access your account
          </p>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="student@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔵
              Sign in with Google
            </button>
            <button
              type="button"
              onClick={handleGithubSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⚫
              Sign in with GitHub
            </button>
          </div>

          <div className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/student-signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up here
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            Are you a teacher?{" "}
            <Link to="/teacher-login" className="text-blue-600 font-semibold hover:underline">
              Teacher Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
