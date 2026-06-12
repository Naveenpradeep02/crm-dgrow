// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const [users] = await db.query("SELECT * FROM users WHERE email=?", [
//       email,
//     ]);

//     if (users.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const user = users[0];

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Password",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user.id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       },
//     );

//     res.json({
//       success: true,
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users
      (name,email,password,role)
      VALUES (?,?,?,?)`,
      [name, email, hashedPassword, "admin"],
    );

    res.status(201).json({
      success: true,
      message: "Admin Registered Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = users[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [user] = await db.query("SELECT * FROM users WHERE email=?", [email]);

    if (!user.length) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await db.query(
      `
      UPDATE users
      SET
      reset_token=?,
      reset_token_expiry=
      DATE_ADD(NOW(), INTERVAL 1 HOUR)
      WHERE email=?
      `,
      [token, email],
    );

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await sendEmail(
      email,
      "Reset Password",
      `
      <h2>Reset Password</h2>

      <a href="${resetLink}">
        Reset Password
      </a>
      `,
    );

    res.json({
      message: "Password reset email sent",
    });
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const [user] = await db.query(
      `
        SELECT *
        FROM users
        WHERE
        reset_token=?
        AND
        reset_token_expiry > NOW()
        `,
      [token],
    );

    if (!user.length) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      `
      UPDATE users
      SET
      password=?,
      reset_token=NULL,
      reset_token_expiry=NULL
      WHERE id=?
      `,
      [hash, user[0].id],
    );

    res.json({
      message: "Password Reset Success",
    });
  } catch (error) {
    console.log(error);
  }
};
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { oldPassword, newPassword } = req.body;

    const [user] = await db.query(
      `
        SELECT *
        FROM users
        WHERE id=?
        `,
      [userId],
    );

    const match = await bcrypt.compare(oldPassword, user[0].password);

    if (!match) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await db.query(
      `
      UPDATE users
      SET
      password=?,
      must_change_password=FALSE
      WHERE id=?
      `,
      [hash, userId],
    );

    res.json({
      message: "Password Changed",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerAdmin,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
};
