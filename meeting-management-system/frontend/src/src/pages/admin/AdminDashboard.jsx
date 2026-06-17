import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getStats } from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    employees: 0,
    clients: 0,
    projects: 0,
    tasks: 0,
    meetings: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getStats();

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-5 gap-5">
        <div className="bg-gray-500 text-white p-5 rounded-lg">
          <h3>Total Employees</h3>
          <h1 className="text-4xl font-bold">{stats.employees}</h1>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-lg">
          <h3>Total Clients</h3>
          <h1 className="text-4xl font-bold">{stats.clients}</h1>
        </div>

        <div className="bg-purple-500 text-white p-5 rounded-lg">
          <h3>Projects</h3>
          <h1 className="text-4xl font-bold">{stats.projects}</h1>
        </div>

        <div className="bg-orange-500 text-white p-5 rounded-lg">
          <h3>Tasks</h3>
          <h1 className="text-4xl font-bold">{stats.tasks}</h1>
        </div>

        <div className="bg-red-500 text-white p-5 rounded-lg">
          <h3>Meetings</h3>
          <h1 className="text-4xl font-bold">{stats.meetings}</h1>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
