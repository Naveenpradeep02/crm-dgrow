import { useState } from "react";
import ClientLayout from "../../layouts/ClientLayout";
import { createMeetingRequest } from "../../services/meetingRequestService";

const RequestMeeting = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    preferred_date: "",
    preferred_time: "",
    request_type: "Online",
    location: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      preferred_date: "",
      preferred_time: "",
      request_type: "Online",
      location: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMeetingRequest(form);

      alert("Meeting Request Sent Successfully");

      resetForm();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <ClientLayout>
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Request Meeting</h1>

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
            name="request_type"
            value={form.request_type}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="Online">Online Meeting</option>

            <option value="Offline">Offline Meeting</option>
          </select>

          {/* Date */}

          <input
            type="date"
            name="preferred_date"
            value={form.preferred_date}
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          {/* Time */}

          <input
            type="time"
            name="preferred_time"
            value={form.preferred_time}
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          {/* Location */}

          {form.request_type === "Offline" && (
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

          {/* Description */}

          <textarea
            name="description"
            value={form.description}
            placeholder="Meeting Description"
            className="border p-3 rounded col-span-2"
            rows="5"
            onChange={handleChange}
          />

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded"
            >
              Send Meeting Request
            </button>
          </div>
        </form>
      </div>
    </ClientLayout>
  );
};

export default RequestMeeting;
