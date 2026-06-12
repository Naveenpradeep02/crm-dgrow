require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const clientRoutes = require("./routes/clientRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const clientDashboardRoutes = require("./routes/clientDashboardRoutes");
const clientProjectRoutes = require("./routes/clientProjectRoutes");
const clientTaskRoutes = require("./routes/clientTaskRoutes");
const meetingRequestRoutes = require("./routes/meetingRequestRoutes");
const meetingRoutes = require("./routes/meetingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Meeting Management API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/client/dashboard", clientDashboardRoutes);
app.use("/api/client/projects", clientProjectRoutes);
app.use("/api/client/tasks", clientTaskRoutes);
app.use("/api/meeting-requests", meetingRequestRoutes);
app.use("/api/meetings", meetingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
