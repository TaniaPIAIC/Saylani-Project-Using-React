import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import {
  getAllStudents,
  deleteStudent,
  bulkAddStudents,
} from "../../firebase/services";
import { Upload, Trash2, Plus, Users } from "lucide-react";
import { parseCSVFile } from "../../utils/helpers";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(studentId);
        setStudents(students.filter((s) => s.id !== studentId));
        alert("Student deleted successfully");
      } catch (error) {
        alert("Error deleting student: " + error.message);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const data = await parseCSVFile(file);
      
      // Validate data
      if (!Array.isArray(data) || data.length === 0) {
        alert("Invalid file format");
        return;
      }

      const newStudents = await bulkAddStudents(data);
      setStudents([...students, ...newStudents]);
      setShowUploadModal(false);
      alert(`${newStudents.length} students added successfully!`);
    } catch (error) {
      alert("Error uploading students: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber?.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p>Loading Students...</p>
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
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Manage Students
            </h1>
            <p className="text-gray-600">
              Total Students: <strong>{students.length}</strong>
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            <Upload size={20} /> Upload Students (Excel)
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  CNIC
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {student.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.cnic}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.rollNumber}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-600">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Upload Students (Excel)</h2>
            <p className="text-gray-600 text-sm mb-4">
              CSV format with columns: fullName, email, cnic, rollNumber
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload size={32} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {uploading ? "Uploading..." : "Click to select file"}
                </span>
              </label>
            </div>
            <button
              onClick={() => setShowUploadModal(false)}
              disabled={uploading}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition disabled:opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
