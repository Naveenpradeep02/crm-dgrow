const db = require("../config/db");

const createMeetingRequest = async (req, res) => {
  try {
    const clientUserId = req.user.id;

    const [client] = await db.query(
      `
      SELECT id
      FROM clients
      WHERE user_id=?
      `,
      [clientUserId],
    );

    if (!client.length) {
      return res.status(404).json({
        message: "Client Not Found",
      });
    }

    const clientId = client[0].id;

    const {
      title,
      description,
      preferred_date,
      preferred_time,
      request_type,
      location,
    } = req.body;

    await db.query(
      `
      INSERT INTO meeting_requests
      (
        client_id,
        title,
        description,
        preferred_date,
        preferred_time,
        request_type,
        location
      )
      VALUES (?,?,?,?,?,?,?)
      `,
      [
        clientId,
        title,
        description,
        preferred_date,
        preferred_time,
        request_type,
        location,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Meeting Request Sent",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getMeetingRequests = async (req, res) => {
  try {
    const [requests] = await db.query(`
      SELECT
      meeting_requests.*,
      clients.company_name

      FROM meeting_requests

      JOIN clients
      ON meeting_requests.client_id = clients.id

      ORDER BY meeting_requests.id DESC
    `);

    res.json(requests);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const approveMeetingRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `
      UPDATE meeting_requests
      SET status='Approved'
      WHERE id=?
      `,
      [id],
    );

    res.json({
      success: true,
      message: "Meeting Request Approved",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const rejectMeetingRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `
      UPDATE meeting_requests
      SET status='Rejected'
      WHERE id=?
      `,
      [id],
    );

    res.json({
      success: true,
      message: "Meeting Request Rejected",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createMeetingRequest,
  getMeetingRequests,
  approveMeetingRequest,
  rejectMeetingRequest,
};
