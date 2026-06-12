const db = require("../config/db");

const createTask = async (req, res) => {
  try {
    const {
      project_id,
      employee_id,
      task_title,
      description,
      priority,
      status,
      due_date,
    } = req.body;

    const [result] = await db.query(
      `
      INSERT INTO tasks
      (
        project_id,
        employee_id,
        task_title,
        description,
        priority,
        status,
        due_date
      )
      VALUES (?,?,?,?,?,?,?)
      `,
      [
        project_id,
        employee_id,
        task_title,
        description,
        priority,
        status,
        due_date,
      ],
    );
    const [employee] = await db.query(
      `
  SELECT user_id
  FROM employees
  WHERE id=?
  `,
      [employee_id],
    );

    const [project] = await db.query(
      `
  SELECT
    projects.project_name,
    clients.user_id
  FROM projects

  JOIN clients
  ON projects.client_id = clients.id

  WHERE projects.id=?
  `,
      [project_id],
    );

    if (project.length > 0) {
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
          project[0].user_id,
          "New Task Added",
          `${task_title} has been added to ${project[0].project_name}`,
        ],
      );
    }

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
        employee[0].user_id,
        "New Task Assigned",
        `${task_title} has been assigned to you`,
      ],
    );

    res.status(201).json({
      success: true,
      taskId: result.insertId,
      message: "Task Created Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getTasks = async (req, res) => {
  try {
    const [tasks] = await db.query(`
      SELECT
        tasks.*,
        projects.project_name,
        employees.department,
        users.name AS employee_name

      FROM tasks

      JOIN projects
      ON tasks.project_id = projects.id

      JOIN employees
      ON tasks.employee_id = employees.id

      JOIN users
      ON employees.user_id = users.id

      ORDER BY tasks.id DESC
    `);

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      project_id,
      employee_id,
      task_title,
      description,
      priority,
      status,
      due_date,
    } = req.body;

    await db.query(
      `
      UPDATE tasks
      SET
      project_id=?,
      employee_id=?,
      task_title=?,
      description=?,
      priority=?,
      status=?,
      due_date=?
      WHERE id=?
      `,
      [
        project_id,
        employee_id,
        task_title,
        description,
        priority,
        status,
        due_date,
        id,
      ],
    );

    res.json({
      success: true,
      message: "Task Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM tasks WHERE id=?", [id]);

    res.json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getEmployeeTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const [employee] = await db.query(
      `
      SELECT id
      FROM employees
      WHERE user_id=?
      `,
      [userId],
    );

    if (!employee.length) {
      return res.status(404).json({
        message: "Employee Not Found",
      });
    }

    const employeeId = employee[0].id;

    const [tasks] = await db.query(
      `
      SELECT
      tasks.*,
      projects.project_name

      FROM tasks

      JOIN projects
      ON tasks.project_id = projects.id

      WHERE employee_id=?

      ORDER BY tasks.id DESC
      `,
      [employeeId],
    );

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    await db.query(
      `
      UPDATE tasks
      SET status=?
      WHERE id=?
      `,
      [status, id],
    );

    res.json({
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const updateTaskProgress = async (req, res) => {
  try {
    const { id } = req.params;

    const { progress } = req.body;

    let status = "Pending";

    if (progress >= 100) {
      status = "Completed";
    } else if (progress > 0) {
      status = "In Progress";
    }

    await db.query(
      `
      UPDATE tasks
      SET
      progress=?,
      status=?
      WHERE id=?
      `,
      [progress, status, id],
    );

    res.json({
      success: true,
      message: "Progress Updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getEmployeeTasks,
  updateTaskStatus,
  updateTaskProgress,
};
