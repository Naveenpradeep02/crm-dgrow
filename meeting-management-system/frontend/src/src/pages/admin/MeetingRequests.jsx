import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getMeetingRequests,
  approveMeetingRequest,
  rejectMeetingRequest,
} from "../../services/meetingRequestService";

const MeetingRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await getMeetingRequests();

      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveMeetingRequest(id);

      alert("Meeting Approved");

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectMeetingRequest(id);

      alert("Meeting Rejected");

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Meeting Requests</h1>

        <table className="w-full border">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3">Client</th>

              <th className="border p-3">Title</th>

              <th className="border p-3">Date</th>

              <th className="border p-3">Time</th>

              <th className="border p-3">Type</th>

              <th className="border p-3">Status</th>

              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="border p-3">{request.company_name}</td>

                <td className="border p-3">{request.title}</td>

                <td className="border p-3">{request.preferred_date}</td>

                <td className="border p-3">{request.preferred_time}</td>

                <td className="border p-3">{request.request_type}</td>

                <td className="border p-3">{request.status}</td>

                <td className="border p-3">
                  {request.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(request.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default MeetingRequests;
