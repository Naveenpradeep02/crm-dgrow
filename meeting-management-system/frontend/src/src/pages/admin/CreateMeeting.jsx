import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import { getMeetingRequests } from "../../services/meetingRequestService";
import { getEmployees } from "../../services/employeeService";
import { createMeeting } from "../../services/meetingService";

const CreateMeeting = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    request_id: id,
    client_id: "",
    title: "",
    description: "",
    meeting_type: "Online",
    meeting_date: "",
    meeting_time: "",
    meeting_link: "",
    location: "",
  });

  const fetchData = async () => {
    try {
      const requestRes = await getMeetingRequests();

      const request = requestRes.data.find((item) => item.id === Number(id));

      if (request) {
        setForm({
          request_id: request.id,
          client_id: request.client_id,
          title: request.title,
          description: request.description,
          meeting_type: request.request_type,
          meeting_date: request.preferred_date,
          meeting_time: request.preferred_time,
          meeting_link: "",
          location: request.location || "",
        });
      }

      const employeeRes = await getEmployees();

      setEmployees(employeeRes.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEmployee = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedEmployees.length === 0) {
        return alert("Please Select At Least One Employee");
      }

      await createMeeting({
        ...form,
        employees: selectedEmployees,
      });

      alert("Meeting Scheduled Successfully");

      navigate("/admin/meeting-requests");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something Went Wrong");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <h2 className="text-xl font-bold">Loading...</h2>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Schedule Meeting</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Title */}

          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="Meeting Title"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          {/* Type */}

          <select
            name="meeting_type"
            value={form.meeting_type}
            className="border p-3 rounded"
            onChange={handleChange}
          >
            <option value="Online">Online</option>

            <option value="Offline">Offline</option>
          </select>

          {/* Date */}

          <input
            type="date"
            name="meeting_date"
            value={form.meeting_date}
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          {/* Time */}

          <input
            type="time"
            name="meeting_time"
            value={form.meeting_time}
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          {/* Description */}

          <textarea
            name="description"
            value={form.description}
            placeholder="Meeting Description"
            className="border p-3 rounded col-span-2"
            rows="4"
            onChange={handleChange}
          />

          {/* Online Meeting */}

          {form.meeting_type === "Online" && (
            <input
              type="text"
              name="meeting_link"
              value={form.meeting_link}
              placeholder="Google Meet Link"
              className="border p-3 rounded col-span-2"
              onChange={handleChange}
              required
            />
          )}

          {/* Offline Meeting */}

          {form.meeting_type === "Offline" && (
            <input
              type="text"
              name="location"
              value={form.location}
              placeholder="Meeting Location"
              className="border p-3 rounded col-span-2"
              onChange={handleChange}
              required
            />
          )}
          <div className="col-span-2">
            <label className="block mb-2 font-semibold">Client</label>

            <input
              type="text"
              value={form.company_name || ""}
              className="border p-3 rounded w-full bg-gray-100"
              readOnly
            />
          </div>
          {/* Employee Selection */}

          <div className="col-span-2 border rounded p-4">
            <h3 className="font-bold mb-3">Select Employees</h3>

            <div className="grid grid-cols-3 gap-3">
              {employees.map((employee) => (
                <label key={employee.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => toggleEmployee(employee.id)}
                  />

                  {employee.name}
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}

          <div className="col-span-2 flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded"
            >
              Schedule Meeting
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/meeting-requests")}
              className="bg-gray-500 text-white px-6 py-3 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateMeeting;
