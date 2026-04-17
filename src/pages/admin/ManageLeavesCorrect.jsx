import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { getAllLeaves, updateLeaveStatus } from "../../firebase/services";
import { CheckCircle, XCircle, MessageCircle } from "lucide-react";

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [comments, setComments] = useState("");

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const data = await getAllLeaves();
      setLeaves(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Error loading leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (leaveId) => {
    try {
      await updateLeaveStatus(leaveId, "approved", comments);
      setLeaves(
        leaves.map((l) =>
          l.id === leaveId
            ? { ...l, status: "approved", comments }
            : l
        )
      );
      setShowDetailModal(false);
      setComments("");
      alert("Leave approved successfully");
    } catch (error) {
      alert("Error approving leave: " + error.message);
    }
  };

  const handleReject = async (leaveId) => {
    try {
      await updateLeaveStatus(leaveId, "rejected", comments);
      setLeaves(
        leaves.map((l) =>
          l.id === leaveId
            ? { ...l, status: "rejected", comments }
            : l
        )
      );
      setShowDetailModal(false);
      setComments("");
      alert("Leave rejected");
    } catch (error) {
      alert("Error rejecting leave: " + error.message);
    }
  };

  const filteredLeaves = leaves.filter((l) => filter === "all" || l.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-600 mx-auto mb-4"></div>
            <p>Loading Leave Requests...</p>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Manage Leave Requests
          </h1>
          <p className="text-gray-600">
            Total Requests: <strong>{leaves.length}</strong>
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {["all", "pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pb-3 font-medium transition ${
                filter === tab
                  ? "border-b-2 border-yellow-600 text-yellow-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} (
              {leaves.filter((l) => tab === "all" || l.status === tab).length})
            </button>
          ))}
        </div>

        {/* Leaves List */}
        <div className="space-y-4">
          {filteredLeaves.length > 0 ? (
            filteredLeaves.map((leave) => (
              <div
                key={leave.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {leave.studentName}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          leave.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : leave.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {leave.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                      <p>
                        <strong>Email:</strong> {leave.studentEmail}
                      </p>
                      <p>
                        <strong>Reason:</strong> {leave.reason}
                      </p>
                      <p>
                        <strong>Date Range:</strong> {leave.startDate} to{" "}
                        {leave.endDate}
                      </p>
                      <p>
                        <strong>Submitted:</strong>{" "}
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

                  {leave.status === "pending" && (
                    <button
                      onClick={() => {
                        setSelectedLeave(leave);
                        setShowDetailModal(true);
                        setComments("");
                      }}
                      className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Review & Respond
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">
                No {filter !== "all" ? filter : ""} leave requests.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              Leave Request Details
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-2">
              <p>
                <strong>Student:</strong> {selectedLeave.studentName}
              </p>
              <p>
                <strong>Email:</strong> {selectedLeave.studentEmail}
              </p>
              <p>
                <strong>Reason:</strong> {selectedLeave.reason}
              </p>
              <p>
                <strong>Period:</strong> {selectedLeave.startDate} to{" "}
                {selectedLeave.endDate}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Your Comments (Optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add comments for the student..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleApprove(selectedLeave.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
              >
                <CheckCircle size={18} /> Approve
              </button>
              <button
                onClick={() => handleReject(selectedLeave.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
              >
                <XCircle size={18} /> Reject
              </button>
            </div>

            <button
              onClick={() => setShowDetailModal(false)}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition mt-3"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLeaves;
