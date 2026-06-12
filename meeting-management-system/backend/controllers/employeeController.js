const db = require("../config/db");
const bcrypt = require("bcryptjs");

const createEmployee = async (req, res) => {
  try {
    const { name, email, department, designation, phone } = req.body;

    // Check existing email
    const [existing] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Temporary Password
    const tempPassword = `${name}123`;

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create user
    const [userResult] = await db.query(
      `
      INSERT INTO users
      (name,email,password,role)
      VALUES (?,?,?,?)
      `,
      [name, email, hashedPassword, "employee"],
    );

    // Create employee
    await db.query(
      `
      INSERT INTO employees
      (
        user_id,
        department,
        designation,
        phone
      )
      VALUES (?,?,?,?)
      `,
      [userResult.insertId, department, designation, phone],
    );

    res.status(201).json({
      success: true,
      message: "Employee Created",
      loginPassword: tempPassword,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getEmployees = async (req, res) => {
  try {
    const [employees] = await db.query(`
      SELECT
      employees.id,
      users.name,
      users.email,
      employees.department,
      employees.designation,
      employees.phone

      FROM employees

      JOIN users
      ON employees.user_id = users.id
    `);

    res.json(employees);
  } catch (error) {
    console.log(error);
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, department, designation, phone } = req.body;

    const [employee] = await db.query("SELECT * FROM employees WHERE id=?", [
      id,
    ]);

    if (employee.length === 0) {
      return res.status(404).json({
        message: "Employee Not Found",
      });
    }

    const employeeData = employee[0];

    await db.query(
      `
      UPDATE users
      SET name=?, email=?
      WHERE id=?
      `,
      [name, email, employeeData.user_id],
    );

    await db.query(
      `
      UPDATE employees
      SET
      department=?,
      designation=?,
      phone=?
      WHERE id=?
      `,
      [department, designation, phone, id],
    );

    res.json({
      success: true,
      message: "Employee Updated",
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const [employee] = await db.query("SELECT * FROM employees WHERE id=?", [
      id,
    ]);

    if (employee.length === 0) {
      return res.status(404).json({
        message: "Employee Not Found",
      });
    }

    const userId = employee[0].user_id;

    await db.query("DELETE FROM users WHERE id=?", [userId]);

    res.json({
      success: true,
      message: "Employee Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
