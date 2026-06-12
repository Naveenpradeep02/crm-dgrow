const db = require("../config/db");

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const [notifications] = await db.query(
      `
      SELECT *
      FROM notifications
      WHERE user_id=?
      ORDER BY id DESC
      `,
      [userId],
    );

    res.json(notifications);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `
      UPDATE notifications
      SET is_read=1
      WHERE id=?
      `,
      [id],
    );

    res.json({
      message: "Notification Updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const [count] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM notifications
      WHERE user_id=?
      AND is_read=0
      `,
      [userId],
    );

    res.json(count[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
};
