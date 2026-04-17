import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { getAllAdmins, getAllStudents, getAllCourses, getAllLeaves } from "../../firebase/services";
import { Users, BookOpen, FileText, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    adminCount: 0,
    pendingLeaves: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [students, courses, admins, leaves] = await Promise.all([
          getAllStudents(),
          getAllCourses(),
          getAllAdmins(),
          getAllLeaves(),
        ]);

        const pendingCount = leaves.filter((l) => l.status === "pending").length;

        setStats({
          students: students.length,
          courses: courses.length,
          adminCount: admins.length,
          pendingLeaves: pendingCount,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <p>Loading Dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, Teacher {user?.name || ""}!
          </h1>
          <p className="text-purple-100">
            Manage students, courses, leaves, and teachers efficiently.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {stats.students}
                </p>
              </div>
              <Users className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Courses</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats.courses}
                </p>
              </div>
              <BookOpen className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Pending Leaves
                </p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {stats.pendingLeaves}
                </p>
              </div>
              <FileText className="text-yellow-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Admin Users</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {stats.adminCount}
                </p>
              </div>
              <BarChart3 className="text-purple-600" size={40} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a
                href="/teacher/manage-students"
                className="block bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-center transition font-medium"
              >
                👥 Manage Students
              </a>
              <a
                href="/teacher/manage-courses"
                className="block bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg text-center transition font-medium"
              >
                📚 Manage Courses
              </a>
              <a
                href="/teacher/manage-leaves"
                className="block bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg text-center transition font-medium"
              >
                📋 Manage Leaves
              </a>
              <a
                href="/teacher/manage-teachers"
                className="block bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg text-center transition font-medium"
              >
                👤 Manage Teachers
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Account Settings</h3>
            <div className="space-y-3">
              <a
                href="/teacher/change-password"
                className="block bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg text-center transition font-medium"
              >
                🔐 Change Password
              </a>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Current Teacher: <strong>{user?.name}</strong></p>
                <p className="text-sm text-gray-600 mt-2">Role: <strong>Teacher</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
