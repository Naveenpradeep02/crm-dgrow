const db = require("../config/db");

const createMeeting = async (req, res) => {
  try {
    console.log("Meeting Body:", req.body);

    const {
      request_id,
      client_id,
      title,
      description,
      meeting_type,
      meeting_date,
      meeting_time,
      meeting_link,
      location,
      employees,
    } = req.body;

    console.log({
      request_id,
      client_id,
      title,
      employees,
    });

    const [meeting] = await db.query(
      `
      INSERT INTO meetings
      (
        request_id,
        client_id,
        title,
        description,
        meeting_type,
        meeting_date,
        meeting_time,
        meeting_link,
        location
      )
      VALUES(?,?,?,?,?,?,?,?,?)
      `,
      [
        request_id,
        client_id,
        title,
        description,
        meeting_type,
        meeting_date,
        meeting_time,
        meeting_link,
        location,
      ],
    );

    const meetingId = meeting.insertId;

    for (const employeeId of employees) {
      const [employee] = await db.query(
        `
        SELECT user_id
        FROM employees
        WHERE id=?
        `,
        [employeeId],
      );

      if (employee.length) {
        await db.query(
          `
          INSERT INTO meeting_participants
          (
            meeting_id,
            user_id,
            participant_role
          )
          VALUES(?,?,?)
          `,
          [meetingId, employee[0].user_id, "Employee"],
        );

        await db.query(
          `
          INSERT INTO notifications
          (
            user_id,
            title,
            message
          )
          VALUES(?,?,?)
          `,
          [
            employee[0].user_id,
            "New Meeting Scheduled",
            `${title} meeting has been scheduled`,
          ],
        );
      }
    }
    const [client] = await db.query(
      `
  SELECT user_id
  FROM clients
  WHERE id=?
  `,
      [client_id],
    );

    if (client.length) {
      await db.query(
        `
    INSERT INTO meeting_participants
    (
      meeting_id,
      user_id,
      participant_role
    )
    VALUES(?,?,?)
    `,
        [meetingId, client[0].user_id, "Client"],
      );

      await db.query(
        `
    INSERT INTO notifications
    (
      user_id,
      title,
      message
    )
    VALUES(?,?,?)
    `,
        [
          client[0].user_id,
          "Meeting Scheduled",
          `${title} meeting has been scheduled`,
        ],
      );
    }

    await db.query(
      `
      UPDATE meeting_requests
      SET status='Approved'
      WHERE id=?
      `,
      [request_id],
    );

    res.status(201).json({
      success: true,
      message: "Meeting Created Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
      sqlMessage: error.sqlMessage,
    });
  }
};

module.exports = {
  createMeeting,
};
