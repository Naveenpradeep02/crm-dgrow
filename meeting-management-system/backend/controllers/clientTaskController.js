const db = require("../config/db");

const getClientTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const [client] = await db.query("SELECT id FROM clients WHERE user_id=?", [
      userId,
    ]);

    const clientId = client[0].id;

    const [tasks] = await db.query(
      `
      SELECT

      tasks.*,

      projects.project_name,

      users.name AS employee_name

      FROM tasks

      JOIN projects
      ON tasks.project_id = projects.id

      JOIN employees
      ON tasks.employee_id = employees.id

      JOIN users
      ON employees.user_id = users.id

      WHERE projects.client_id=?

      ORDER BY tasks.id DESC
      `,
      [clientId],
    );

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getClientTasks,
};
