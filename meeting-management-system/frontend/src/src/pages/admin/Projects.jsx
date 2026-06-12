import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../../services/projectService";

import { getClients } from "../../services/clientService";

const Projects = () => {
  const [editingId, setEditingId] = useState(null);

  const [clients, setClients] = useState([]);

  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    client_id: "",
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchClients = async () => {
    try {
      const res = await getClients();
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchProjects();
  }, []);

  const resetForm = () => {
    setEditingId(null);

    setForm({
      client_id: "",
      project_name: "",
      description: "",
      start_date: "",
      end_date: "",
      status: "Pending",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateProject(editingId, form);

        alert("Project Updated Successfully");
      } else {
        await createProject(form);

        alert("Project Created Successfully");
      }

      fetchProjects();
      resetForm();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete Project ?");

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      alert("Project Deleted");

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      {/* Form */}

      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          {editingId ? "Update Project" : "Add Project"}
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Client */}

          <select
            name="client_id"
            value={form.client_id}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Client</option>

            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.company_name}
              </option>
            ))}
          </select>

          {/* Project Name */}

          <input
            type="text"
            name="project_name"
            value={form.project_name}
            placeholder="Project Name"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          {/* Description */}

          <textarea
            name="description"
            value={form.description}
            placeholder="Description"
            className="border p-3 rounded col-span-2"
            onChange={handleChange}
          />

          {/* Dates */}

          <input
            type="date"
            name="start_date"
            value={form.start_date}
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="date"
            name="end_date"
            value={form.end_date}
            className="border p-3 rounded"
            onChange={handleChange}
          />

          {/* Status */}

          <select
            name="status"
            value={form.status}
            className="border p-3 rounded"
            onChange={handleChange}
          >
            <option>Pending</option>

            <option>In Progress</option>

            <option>Completed</option>

            <option>On Hold</option>
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              className={`px-6 py-3 rounded text-white ${
                editingId ? "bg-yellow-500" : "bg-blue-600"
              }`}
            >
              {editingId ? "Update Project" : "Create Project"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);

                  setForm({
                    client_id: "",
                    project_name: "",
                    description: "",
                    start_date: "",
                    end_date: "",
                    status: "Pending",
                  });
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Project List */}

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Project List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3">Project Name</th>

              <th className="border p-3">Client</th>

              <th className="border p-3">Start Date</th>

              <th className="border p-3">End Date</th>

              <th className="border p-3">Status</th>

              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id}>
                  <td className="border p-3">{project.project_name}</td>

                  <td className="border p-3">{project.company_name}</td>

                  <td className="border p-3">{project.start_date}</td>

                  <td className="border p-3">{project.end_date}</td>

                  <td className="border p-3">{project.status}</td>

                  <td className="border p-3">
                    <button
                      onClick={() => {
                        setEditingId(project.id);

                        setForm({
                          client_id: project.client_id,
                          project_name: project.project_name,
                          description: project.description,
                          start_date: project.start_date?.split("T")[0],
                          end_date: project.end_date?.split("T")[0],
                          status: project.status,
                        });
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No Projects Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Projects;
