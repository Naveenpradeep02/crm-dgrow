import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { getMyTasks } from "../../services/employeeTaskService";

const EmployeeDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    progress: 0,
    completed: 0,
  });

  const fetchTasks = async () => {
    try {
      const res = await getMyTasks();

      const tasks = res.data;

      setStats({
        total: tasks.length,

        pending: tasks.filter((task) => task.status === "Pending").length,

        progress: tasks.filter((task) => task.status === "In Progress").length,

        completed: tasks.filter((task) => task.status === "Completed").length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <EmployeeLayout>
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded shadow">
          <h3>Total Tasks</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Pending</h3>
          <p className="text-3xl font-bold text-red-500">{stats.pending}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>In Progress</h3>
          <p className="text-3xl font-bold text-yellow-500">{stats.progress}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Completed</h3>
          <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;
