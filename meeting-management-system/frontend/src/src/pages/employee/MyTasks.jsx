import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";

import {
  getMyTasks,
  updateTaskStatus,
  updateTaskProgress,
} from "../../services/employeeTaskService";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await getMyTasks();

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusUpdate = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, { status });

      alert("Task Status Updated");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleProgressUpdate = async (taskId, progress) => {
    try {
      await updateTaskProgress(taskId, {
        progress,
      });

      alert("Task Progress Updated");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      task.status !== "Completed" && new Date(task.due_date) < new Date(),
  ).length;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.task_title.toLowerCase().includes(search.toLowerCase()) ||
      task.project_name.toLowerCase().includes(search.toLowerCase());

    if (filter === "All") return matchesSearch;

    if (filter === "Overdue") {
      return (
        matchesSearch &&
        task.status !== "Completed" &&
        new Date(task.due_date) < new Date()
      );
    }

    return matchesSearch && task.status === filter;
  });
  return (
    <EmployeeLayout>
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3>Total</h3>
          <p className="text-2xl font-bold">{totalTasks}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Pending</h3>
          <p className="text-2xl font-bold text-red-500">{pendingTasks}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>In Progress</h3>
          <p className="text-2xl font-bold text-yellow-500">{progressTasks}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Completed</h3>
          <p className="text-2xl font-bold text-green-500">{completedTasks}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Overdue</h3>
          <p className="text-2xl font-bold text-red-700">{overdueTasks}</p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search Task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-72"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Overdue</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-slate-100">
                <th className="border p-3">Task</th>

                <th className="border p-3">Project</th>

                <th className="border p-3">Priority</th>

                <th className="border p-3">Due Date</th>

                <th className="border p-3">Status</th>

                <th className="border p-3">Progress</th>

                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="border p-3">{task.task_title}</td>

                    <td className="border p-3">{task.project_name}</td>

                    <td className="border p-3">
                      <span
                        className={`px-3 py-1 rounded text-white ${
                          task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td
                      className={`border p-3 ${
                        task.status !== "Completed" &&
                        new Date(task.due_date) < new Date()
                          ? "bg-red-100 text-red-600 font-bold"
                          : ""
                      }`}
                    >
                      {new Date(task.due_date).toLocaleDateString()}
                    </td>

                    <td className="border p-3">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusUpdate(task.id, e.target.value)
                        }
                        className="border p-2 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="border p-3">
                      <div className="w-40">
                        <div className="bg-gray-200 h-3 rounded">
                          <div
                            className={`h-3 rounded ${
                              task.progress < 25
                                ? "bg-red-500"
                                : task.progress < 75
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${task.progress || 0}%`,
                            }}
                          ></div>
                        </div>

                        <p className="text-sm mt-1">{task.progress || 0}%</p>

                        <select
                          value={task.progress || 0}
                          onChange={(e) =>
                            handleProgressUpdate(task.id, e.target.value)
                          }
                          className="border p-1 rounded mt-2 w-full"
                        >
                          <option value="0">0%</option>
                          <option value="25">25%</option>
                          <option value="50">50%</option>
                          <option value="75">75%</option>
                          <option value="100">100%</option>
                        </select>
                      </div>
                    </td>

                    <td className="border p-3">
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        View
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
      </div>

      {/* Task Details Modal */}

      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[650px] rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Task Details</h2>

            <div className="space-y-3">
              <p>
                <strong>Task:</strong> {selectedTask.task_title}
              </p>

              <p>
                <strong>Project:</strong> {selectedTask.project_name}
              </p>

              <p>
                <strong>Description:</strong> {selectedTask.description}
              </p>

              <p>
                <strong>Priority:</strong> {selectedTask.priority}
              </p>

              <p>
                <strong>Status:</strong> {selectedTask.status}
              </p>

              <p>
                <strong>Progress:</strong> {selectedTask.progress || 0}%
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(selectedTask.due_date).toLocaleDateString()}
              </p>

              {selectedTask.status !== "Completed" &&
                new Date(selectedTask.due_date) < new Date() && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded">
                    Overdue Task
                  </span>
                )}
            </div>

            <button
              onClick={() => setSelectedTask(null)}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </EmployeeLayout>
  );
};

export default MyTasks;
