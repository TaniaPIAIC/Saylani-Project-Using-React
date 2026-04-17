import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { updateAdminPassword, getAdminByUsername } from "../../firebase/services";
import { hashPassword, verifyPassword } from "../../utils/helpers";
import { Lock } from "lucide-react";

const AdminPasswordReset = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Current password is required";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
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

    setLoading(true);

    try {
      // Verify old password
      const admin = await getAdminByUsername(user.username);

      if (!admin) {
        setErrors({ submit: "Teacher account not found" });
        setLoading(false);
        return;
      }

      if (!verifyPassword(formData.oldPassword, admin.password)) {
        setErrors({ oldPassword: "Incorrect current password" });
        setLoading(false);
        return;
      }

      // Update to new password
      const newPasswordHash = hashPassword(formData.newPassword);
      await updateAdminPassword(admin.id, newPasswordHash);

      setSuccess(true);
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });

      setTimeout(() => {
        navigate("/teacher-dashboard");
      }, 2000);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-green-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center bg-white p-8 rounded-lg shadow">
            <div className="mb-4 text-4xl">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Password Updated Successfully
            </h2>
            <p className="text-gray-600">
              Redirecting to dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-center justify-center mb-6">
            <Lock className="text-indigo-600 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Change Password</h1>
          </div>

          <p className="text-gray-600 text-center mb-8">
            Update your teacher account password
          </p>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  errors.oldPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter current password"
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>
              )}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <a
              href="/teacher-dashboard"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPasswordReset;
