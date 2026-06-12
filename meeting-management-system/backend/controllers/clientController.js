const db = require("../config/db");
const bcrypt = require("bcryptjs");

const createClient = async (req, res) => {
  try {
    const {
      name,
      email,
      company_name,
      phone,
      address,
      city,
      state,
      country,
      website,
      notes,
    } = req.body;

    const [existing] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const tempPassword = `${company_name}@123`;

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const [userResult] = await db.query(
      `
        INSERT INTO users
        (
          name,
          email,
          password,
          role
        )
        VALUES (?,?,?,?)
      `,
      [name, email, hashedPassword, "client"],
    );

    await db.query(
      `
      INSERT INTO clients
      (
        user_id,
        company_name,
        phone,
        address,
        city,
        state,
        country,
        website,
        notes
      )
      VALUES (?,?,?,?,?,?,?,?,?)
    `,
      [
        userResult.insertId,
        company_name,
        phone,
        address,
        city,
        state,
        country,
        website,
        notes,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Client Created",
      password: tempPassword,
    });
  } catch (error) {
    console.log(error);
  }
};
const getClients = async (req, res) => {
  try {
    const [clients] = await db.query(`
      SELECT
        clients.id,
        users.name,
        users.email,
        clients.company_name,
        clients.phone,
        clients.city,
        clients.country

      FROM clients

      JOIN users
      ON clients.user_id = users.id
    `);

    res.json(clients);
  } catch (error) {
    console.log(error);
  }
};
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      company_name,
      phone,
      address,
      city,
      state,
      country,
      website,
      notes,
    } = req.body;

    const [client] = await db.query("SELECT * FROM clients WHERE id=?", [id]);

    if (client.length === 0) {
      return res.status(404).json({
        message: "Client Not Found",
      });
    }

    const clientData = client[0];

    await db.query(
      `
      UPDATE users
      SET name=?, email=?
      WHERE id=?
      `,
      [name, email, clientData.user_id],
    );

    await db.query(
      `
      UPDATE clients
      SET
      company_name=?,
      phone=?,
      address=?,
      city=?,
      state=?,
      country=?,
      website=?,
      notes=?
      WHERE id=?
      `,
      [company_name, phone, address, city, state, country, website, notes, id],
    );

    res.json({
      success: true,
      message: "Client Updated",
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const [client] = await db.query("SELECT * FROM clients WHERE id=?", [id]);

    if (client.length === 0) {
      return res.status(404).json({
        message: "Client Not Found",
      });
    }

    await db.query("DELETE FROM users WHERE id=?", [client[0].user_id]);

    res.json({
      success: true,
      message: "Client Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createClient,
  getClients,
  updateClient,
  deleteClient,
};
