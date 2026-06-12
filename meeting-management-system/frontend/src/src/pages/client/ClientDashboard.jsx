import { useEffect, useState } from "react";

import { getClientDashboard } from "../../services/clientDashboardService";
import ClientLayout from "../../layouts/ClientLayout";

const ClientDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingTasks: 0,
  });

  const fetchDashboard = async () => {
    try {
      const res = await getClientDashboard();

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <ClientLayout>
      <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded shadow">
          <h3>Total Projects</h3>

          <p className="text-3xl font-bold">{stats.totalProjects}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Active Projects</h3>

          <p className="text-3xl font-bold text-blue-600">
            {stats.activeProjects}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Completed Projects</h3>

          <p className="text-3xl font-bold text-green-600">
            {stats.completedProjects}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Pending Tasks</h3>

          <p className="text-3xl font-bold text-red-600">
            {stats.pendingTasks}
          </p>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;
