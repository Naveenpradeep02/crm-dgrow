const db = require("../config/db");

const createProject = async (req, res) => {
  try {
    const {
      client_id,
      project_name,
      description,
      start_date,
      end_date,
      status,
    } = req.body;

    const [result] = await db.query(
      `
        INSERT INTO projects
        (
          client_id,
          project_name,
          description,
          start_date,
          end_date,
          status
        )
        VALUES (?,?,?,?,?,?)
      `,
      [client_id, project_name, description, start_date, end_date, status],
    );
    const [client] = await db.query(
      `
  SELECT user_id
  FROM clients
  WHERE id=?
  `,
      [client_id],
    );

    await db.query(
      `
  INSERT INTO notifications
  (
    user_id,
    title,
    message
  )
  VALUES (?,?,?)
  `,
      [
        client[0].user_id,
        "New Project Created",
        `${project_name} has been created`,
      ],
    );
    res.status(201).json({
      success: true,
      message: "Project Created",
      projectId: result.insertId,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getProjects = async (req, res) => {
  try {
    const [projects] = await db.query(`
      SELECT

      projects.id,

      projects.client_id,

      projects.project_name,

      projects.description,

      projects.start_date,

      projects.end_date,

      projects.status,

      clients.company_name

      FROM projects

      JOIN clients
      ON projects.client_id = clients.id

      ORDER BY projects.id DESC
    `);

    res.json(projects);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      client_id,
      project_name,
      description,
      start_date,
      end_date,
      status,
    } = req.body;

    await db.query(
      `
      UPDATE projects
      SET
      client_id=?,
      project_name=?,
      description=?,
      start_date=?,
      end_date=?,
      status=?
      WHERE id=?
      `,
      [client_id, project_name, description, start_date, end_date, status, id],
    );

    res.json({
      message: "Project Updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM projects WHERE id=?", [id]);

    res.json({
      message: "Project Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
