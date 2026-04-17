import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { submitLeaveRequest, getStudentLeaves } from "../../firebase/services";
import { FileText, Plus, CheckCircle, XCircle, Clock } from "lucide-react";

const StudentLeaves = () => {
  const { user } = useSelector((state) => state.auth);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    reason: "",
    startDate: "",
    endDate: "",
    image: null,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        if (user?.uid) {
          const data = await getStudentLeaves(user.uid);
          setLeaves(data);
        }
      } catch (error) {
        console.error("Error loading leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaves();
  }, [user?.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reason || !formData.startDate || !formData.endDate) {
      alert("Please fill in all required fields");
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert("Start date must be before end date");
      return;
    }

    setSubmitting(true);

    try {
      const newLeave = await submitLeaveRequest({
        studentId: user.uid,
        studentName: user.name,
        studentEmail: user.email,
        reason: formData.reason,
        startDate: formData.startDate,
        endDate: formData.endDate,
        imageUrl: formData.image, // Would need Cloudinary upload
      });

      setLeaves([newLeave, ...leaves]);
      setFormData({ reason: "", startDate: "", endDate: "", image: null });
      setShowForm(false);
      alert("Leave request submitted successfully!");
    } catch (error) {
      alert("Error submitting leave request: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
            <CheckCircle size={16} /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
            <XCircle size={16} /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">
            <Clock size={16} /> Pending
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p>Loading Leaves...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Leave Requests
            </h1>
            <p className="text-gray-600">
              Submit and track your leave requests here.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            <Plus size={20} /> New Request
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Submit Leave Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Reason for Leave *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  placeholder="Explain your reason for leave..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Attachment (Optional)
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Leaves List */}
        <div className="space-y-4">
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <div
                key={leave.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {leave.reason}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Period:</strong> {leave.startDate} to{" "}
                        {leave.endDate}
                      </p>
                      <p>
                        <strong>Requested on:</strong>{" "}
                        {new Date(
                          leave.createdAt?.toDate?.() || leave.createdAt
                        ).toLocaleDateString()}
                      </p>
                      {leave.comments && (
                        <p>
                          <strong>Admin Comments:</strong> {leave.comments}
                        </p>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(leave.status)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <FileText className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600">
                No leave requests submitted yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLeaves;
