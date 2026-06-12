import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./src/pages/Login";
import PrivateRoute from "./src/routes/PrivateRoute";
import EmployeeDashboard from "./src/pages/employee/EmployeeDashboard";
import ClientDashboard from "./src/pages/client/ClientDashboard";
import AdminDashboard from "./src/pages/admin/AdminDashboard";
import Employees from "./src/pages/admin/Employees";
import Clients from "./src/pages/admin/Clients";
import ForgotPassword from "./src/pages/auth/ForgotPassword";
import ResetPassword from "./src/pages/auth/ResetPassword";
import ChangePassword from "./src/pages/auth/ChangePassword";
import Projects from "./src/pages/admin/Projects";
import Tasks from "./src/pages/admin/Tasks";
import MyTasks from "./src/pages/employee/MyTasks";
import Notifications from "./src/pages/common/Notifications";
import ClientProjects from "./src/pages/client/ClientProjects";
import ClientTasks from "./src/pages/client/ClientTasks";
import RequestMeeting from "./src/pages/client/RequestMeeting";
import MeetingRequests from "./src/pages/admin/MeetingRequests";
import CreateMeeting from "./src/pages/admin/CreateMeeting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/dashboard"
          element={
            <PrivateRoute role="employee">
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/dashboard"
          element={
            <PrivateRoute role="client">
              <ClientDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <PrivateRoute role="admin">
              <Employees />
            </PrivateRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/admin/clients" element={<Clients />} />
        <Route path="/admin/projects" element={<Projects />} />
        <Route path="/admin/tasks" element={<Tasks />} />
        <Route path="/employee/tasks" element={<MyTasks />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/client/projects" element={<ClientProjects />} />
        <Route path="/client/tasks" element={<ClientTasks />} />
        <Route path="/client/request-meeting" element={<RequestMeeting />} />
        <Route path="/admin/meeting-requests" element={<MeetingRequests />} />
        <Route path="/admin/create-meeting" element={<CreateMeeting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
