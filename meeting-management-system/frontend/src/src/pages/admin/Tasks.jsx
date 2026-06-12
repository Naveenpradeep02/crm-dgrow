import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../services/taskService";

import { getProjects } from "../../services/projectService";
import { getEmployees } from "../../services/employeeService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    project_id: "",
    employee_id: "",
    task_title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    due_date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
    fetchTasks();
  }, []);

  const resetForm = () => {
    setEditingId(null);

    setForm({
      project_id: "",
      employee_id: "",
      task_title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      due_date: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    if (!form.project_id) {
      alert("Please Select Project");
      return;
    }

    if (!form.employee_id) {
      alert("Please Select Employee");
      return;
    }

    if (!form.task_title) {
      alert("Please Enter Task Title");
      return;
    }

    try {
      if (editingId) {
        await updateTask(editingId, form);
        alert("Task Updated Successfully");
      } else {
        await createTask(form);
        alert("Task Created Successfully");
      }

      fetchTasks();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);

      alert("Task Deleted Successfully");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      {/* FORM */}

      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          {editingId ? "Update Task" : "Create Task"}
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Project */}

          <select
            name="project_id"
            value={form.project_id}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.project_name}
              </option>
            ))}
          </select>

          {/* Employee */}

          <select
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Assign Employee</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>

          {/* Title */}

          <input
            type="text"
            name="task_title"
            value={form.task_title}
            placeholder="Task Title"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          {/* Due Date */}

          <input
            type="date"
            name="due_date"
            value={form.due_date}
            className="border p-3 rounded"
            onChange={handleChange}
          />

          {/* Description */}

          <textarea
            name="description"
            value={form.description}
            placeholder="Task Description"
            className="border p-3 rounded col-span-2"
            onChange={handleChange}
          />

          {/* Priority */}

          <select
            name="priority"
            value={form.priority}
            className="border p-3 rounded"
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

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
          </select>

          {/* Buttons */}

          <div className="flex gap-3">
            <button
              type="submit"
              className={`px-6 py-3 rounded text-white ${
                editingId ? "bg-yellow-500" : "bg-blue-600"
              }`}
            >
              {editingId ? "Update Task" : "Create Task"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TASK LIST */}

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Task List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3">Task</th>
              <th className="border p-3">Project</th>
              <th className="border p-3">Employee</th>
              <th className="border p-3">Priority</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Due Date</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border p-3">{task.task_title}</td>

                  <td className="border p-3">{task.project_name}</td>

                  <td className="border p-3">{task.employee_name}</td>

                  <td className="border p-3">{task.priority}</td>

                  <td className="border p-3">{task.status}</td>

                  <td className="border p-3">{task.due_date}</td>

                  <td className="border p-3">
                    <button
                      onClick={() => {
                        setEditingId(task.id);

                        setForm({
                          project_id: task.project_id,
                          employee_id: task.employee_id,
                          task_title: task.task_title,
                          description: task.description,
                          priority: task.priority,
                          status: task.status,
                          due_date: task.due_date?.split("T")[0],
                        });
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No Tasks Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Tasks;
