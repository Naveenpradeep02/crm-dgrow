import { useEffect, useState } from "react";
import ClientLayout from "../../layouts/ClientLayout";
import { getClientTasks } from "../../services/clientTaskService";

const ClientTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getClientTasks();

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ClientLayout>
      <h1 className="text-3xl font-bold mb-6">Project Tasks</h1>

      <div className="bg-white p-6 rounded shadow">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-3">Task</th>

              <th className="border p-3">Project</th>

              <th className="border p-3">Employee</th>

              <th className="border p-3">Status</th>

              <th className="border p-3">Progress</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border p-3">{task.task_title}</td>

                <td className="border p-3">{task.project_name}</td>

                <td className="border p-3">{task.employee_name}</td>

                <td className="border p-3">{task.status}</td>

                <td className="border p-3">{task.progress || 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ClientLayout>
  );
};

export default ClientTasks;
