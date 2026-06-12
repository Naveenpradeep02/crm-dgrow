const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const [employees] = await db.query(
      "SELECT COUNT(*) AS total FROM employees",
    );

    const [clients] = await db.query("SELECT COUNT(*) AS total FROM clients");

    const [projects] = await db.query("SELECT COUNT(*) AS total FROM projects");

    const [tasks] = await db.query("SELECT COUNT(*) AS total FROM tasks");

    const [meetings] = await db.query("SELECT COUNT(*) AS total FROM meetings");

    res.json({
      employees: employees[0].total,
      clients: clients[0].total,
      projects: projects[0].total,
      tasks: tasks[0].total,
      meetings: meetings[0].total,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};
