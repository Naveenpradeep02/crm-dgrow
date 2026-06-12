const db = require("../config/db");

const getClientProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const [client] = await db.query("SELECT id FROM clients WHERE user_id=?", [
      userId,
    ]);

    const clientId = client[0].id;

    const [projects] = await db.query(
      `
      SELECT *
      FROM projects
      WHERE client_id=?
      ORDER BY id DESC
      `,
      [clientId],
    );

    res.json(projects);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getClientProjects,
};
