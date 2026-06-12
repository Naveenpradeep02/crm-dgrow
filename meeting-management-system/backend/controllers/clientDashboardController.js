const db = require("../config/db");

const getClientDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find Client
    const [client] = await db.query(
      `
      SELECT id
      FROM clients
      WHERE user_id = ?
      `,
      [userId],
    );

    if (client.length === 0) {
      return res.status(404).json({
        message: "Client Not Found",
      });
    }

    const clientId = client[0].id;

    // Total Projects
    const [totalProjects] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM projects
      WHERE client_id=?
      `,
      [clientId],
    );

    // Active Projects
    const [activeProjects] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM projects
      WHERE client_id=?
      AND status='In Progress'
      `,
      [clientId],
    );

    // Completed Projects
    const [completedProjects] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM projects
      WHERE client_id=?
      AND status='Completed'
      `,
      [clientId],
    );

    // Pending Tasks
    const [pendingTasks] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM tasks

      JOIN projects
      ON tasks.project_id = projects.id

      WHERE projects.client_id=?
      AND tasks.status!='Completed'
      `,
      [clientId],
    );

    res.json({
      totalProjects: totalProjects[0].total,
      activeProjects: activeProjects[0].total,
      completedProjects: completedProjects[0].total,
      pendingTasks: pendingTasks[0].total,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getClientDashboard,
};
