import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { getAllCourses } from "../../firebase/services";
import { User, BookOpen, FileText, LogOut } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    courses: 0,
    applications: 0,
    leaves: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const courses = await getAllCourses();
        setStats({
          courses: courses.length,
          applications: 0,
          leaves: 0,
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name || "Student"}!</h1>
          <p className="text-blue-100">
            Manage your courses, applications, and leave requests in one place.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Available Courses</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.courses}</p>
              </div>
              <BookOpen className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">My Applications</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.applications}</p>
              </div>
              <FileText className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Leave Requests</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.leaves}</p>
              </div>
              <FileText className="text-yellow-600" size={40} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a
                href="/courses"
                className="block bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-center transition font-medium"
              >
                📚 Browse Courses
              </a>
              <a
                href="/my-applications"
                className="block bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg text-center transition font-medium"
              >
                📋 View Applications
              </a>
              <a
                href="/student-leaves"
                className="block bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg text-center transition font-medium"
              >
                🗓️ Manage Leaves
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Profile Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User size={20} className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{user?.name || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User size={20} className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{user?.email || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
