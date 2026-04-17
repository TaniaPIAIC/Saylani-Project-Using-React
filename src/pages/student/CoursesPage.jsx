import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getAllCourses, submitApplication as submitApplicationApi } from "../../firebase/services";
import { fetchCoursesSuccess } from "../../redux/slices/courseSlice";
import { BookOpen, Calendar, Users, Clock } from "lucide-react";

const CoursesPage = () => {
  const { user, isAuthenticated, userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAllCourses();
        dispatch(fetchCoursesSuccess(data));
        setFilteredCourses(data);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, [dispatch]);

  const handleApply = (course) => {
    if (!isAuthenticated || userType !== "student") {
      navigate("/student-login");
      return;
    }
    setSelectedCourse(course);
    setShowApplyModal(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;

    try {
      await submitApplicationApi({
        studentId: user.uid,
        studentName: user.name,
        studentEmail: user.email,
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.title,
      });
      alert("Application submitted successfully!");
      setShowApplyModal(false);
    } catch (error) {
      console.error("Application submission error:", error);
      alert("Unable to submit application. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p>Loading Courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Available Courses</h1>
          <p className="text-gray-600">
            Explore our wide range of courses and apply today!
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    {course.duration && (
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{course.duration}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>
                        {course.seats || "Limited"} seats available
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        course.status === "Open"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.status || "Open"}
                    </span>
                    <button
                      onClick={() => handleApply(course)}
                      disabled={course.status !== "Open"}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        course.status === "Open"
                          ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {course.status === "Open"
                        ? isAuthenticated && userType === "student"
                          ? "Apply"
                          : "Login to Apply"
                        : "Closed"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-600">
              No courses available at the moment.
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              Apply for: {selectedCourse.title}
            </h2>
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message (Optional)
                </label>
                <textarea
                  placeholder="Tell us why you want to take this course..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
