import { useEffect, useState } from "react";
import ClientLayout from "../../layouts/ClientLayout";
import { getClientProjects } from "../../services/clientProjectService";

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await getClientProjects();

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ClientLayout>
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>

      <div className="bg-white p-6 rounded shadow">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-3">Project</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Start</th>
              <th className="border p-3">End</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="border p-3">{project.project_name}</td>

                <td className="border p-3">{project.status}</td>

                <td className="border p-3">{project.start_date}</td>

                <td className="border p-3">{project.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ClientLayout>
  );
};

export default ClientProjects;
