import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/slices/authSlice";
import { registerStudent, signInWithGoogle, signInWithGithub, logout } from "../firebase/auth";
import { getStudentByEmail, updateStudent } from "../firebase/services";
import { validateEmail, validateCNIC } from "../utils/helpers";
import Navbar from "../components/Navbar";
import logo from "../assets/favicon/smit-logo.png";

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cnic: "",
    rollNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.cnic) {
      newErrors.cnic = "CNIC is required";
    } else if (!validateCNIC(formData.cnic)) {
      newErrors.cnic = "CNIC format should be: XXXXX-XXXXXXX-X";
    }
    if (!formData.rollNumber) {
      newErrors.rollNumber = "Roll number is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const studentRecord = await getStudentByEmail(formData.email);
      if (!studentRecord) {
        throw new Error(
          "Your email is not found in the student list. Please ask admin to add you first."
        );
      }

      if (studentRecord.cnic !== formData.cnic) {
        throw new Error("CNIC does not match the registered student record.");
      }
      if (studentRecord.rollNumber !== formData.rollNumber) {
        throw new Error("Roll number does not match the registered student record.");
      }

      // Register with Firebase Auth
      const user = await registerStudent(formData.email, formData.password, {
        fullName: formData.fullName,
      });

      // Update existing student record with Firebase UID and provider
      await updateStudent(studentRecord.id, {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        cnic: formData.cnic,
        rollNumber: formData.rollNumber,
        provider: "email",
      });

      dispatch(
        loginSuccess({
          user: { uid: user.uid, email: user.email, name: user.displayName },
          userType: "student",
        })
      );
      navigate("/student-dashboard");
    } catch (error) {
      const errorMessage =
        error.code === "auth/email-already-in-use"
          ? "Email already registered"
          : error.message;
      dispatch(loginFailure(errorMessage));
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const signInWithOAuthStudent = async (provider) => {
    dispatch(loginStart());
    setLoading(true);

    try {
      const user =
        provider === "google"
          ? await signInWithGoogle()
          : await signInWithGithub();

      const studentRecord = await getStudentByEmail(user.email);
      if (!studentRecord) {
        await logout();
        throw new Error(
          "Your account is not registered for portal access. Please contact admin."
        );
      }

      await updateStudent(studentRecord.id, {
        uid: user.uid,
        provider,
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
      const errorMessage = error.message || "OAuth signup failed";
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
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <img
            src={logo}
            alt="SMIT Logo"
            className="h-20 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Student Signup
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Create your account to get started
          </p>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="student@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="cnic" className="block text-sm font-semibold text-gray-700 mb-1">
                CNIC (Format: XXXXX-XXXXXXX-X)
              </label>
              <input
                type="text"
                id="cnic"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                  errors.cnic ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="12345-6789012-3"
              />
              {errors.cnic && (
                <p className="text-red-500 text-xs mt-1">{errors.cnic}</p>
              )}
            </div>

            <div>
              <label htmlFor="rollNumber" className="block text-sm font-semibold text-gray-700 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                  errors.rollNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your roll number"
              />
              {errors.rollNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 mt-6 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300" />
            <p className="text-sm text-gray-500">OR</p>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => signInWithOAuthStudent("google")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔵 Sign up with Google
            </button>
            <button
              type="button"
              onClick={() => signInWithOAuthStudent("github")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⚫ Sign up with GitHub
            </button>
          </div>

          <div className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/student-login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;