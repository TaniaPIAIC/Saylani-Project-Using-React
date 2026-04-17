import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "./firebase/auth";

// Pages
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import TeacherLogin from "./pages/admin/AdminLogin";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import CoursesPage from "./pages/student/CoursesPage";
import StudentLeaves from "./pages/student/StudentLeaves";
import MyApplications from "./pages/student/MyApplications";

// Teacher Pages
import TeacherDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageLeaves from "./pages/admin/ManageLeaves";
import ManageTeachers from "./pages/admin/ManageAdmins";
import TeacherPasswordReset from "./pages/admin/AdminPasswordReset";

// Protected Route Component
const ProtectedRoute = ({ element, requiredType }) => {
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(() => {
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return requiredType === "student" ? (
      <Navigate to="/student-login" />
    ) : (
      <Navigate to="/teacher-login" />
    );
  }

  if (requiredType && userType !== requiredType) {
    return <Navigate to="/" />;
  }

  return element;
};

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />

        {/* Student Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute
              element={<StudentDashboard />}
              requiredType="student"
            />
          }
        />
        <Route path="/courses" element={<CoursesPage />} />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute
              element={<MyApplications />}
              requiredType="student"
            />
          }
        />
        <Route
          path="/student-leaves"
          element={
            <ProtectedRoute
              element={<StudentLeaves />}
              requiredType="student"
            />
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute
              element={<TeacherDashboard />}
              requiredType="teacher"
            />
          }
        />
        <Route
          path="/teacher/manage-students"
          element={
            <ProtectedRoute
              element={<ManageStudents />}
              requiredType="teacher"
            />
          }
        />
        <Route
          path="/teacher/manage-courses"
          element={
            <ProtectedRoute
              element={<ManageCourses />}
              requiredType="teacher"
            />
          }
        />
        <Route
          path="/teacher/manage-leaves"
          element={
            <ProtectedRoute
              element={<ManageLeaves />}
              requiredType="teacher"
            />
          }
        />
        <Route
          path="/teacher/manage-teachers"
          element={
            <ProtectedRoute
              element={<ManageTeachers />}
              requiredType="teacher"
            />
          }
        />
        <Route
          path="/teacher/change-password"
          element={
            <ProtectedRoute
              element={<TeacherPasswordReset />}
              requiredType="teacher"
            />
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
