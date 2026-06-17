import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaChartBar,
  FaProjectDiagram,
  FaTasks,
  FaLock,
  FaBell,
  FaCalculator,
} from "react-icons/fa";

import { getUnreadCount } from "../services/notificationService";

const ClientLayout = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await getUnreadCount();

      console.log("CLIENT COUNT:", res.data);

      setUnreadCount(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <div className="w-64 bg-slate-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Client Panel</h2>

        <ul className="space-y-2">
          {/* Dashboard */}

          <li>
            <Link
              to="/client/dashboard"
              className="flex items-center gap-3 px-5 py-3 rounded hover:bg-slate-800"
            >
              <FaChartBar />
              Dashboard
            </Link>
          </li>

          {/* Projects */}

          <li>
            <Link
              to="/client/projects"
              className="flex items-center gap-3 px-5 py-3 rounded hover:bg-slate-800"
            >
              <FaProjectDiagram />
              My Projects
            </Link>
          </li>

          {/* Tasks */}

          <li>
            <Link
              to="/client/tasks"
              className="flex items-center gap-3 px-5 py-3 rounded hover:bg-slate-800"
            >
              <FaTasks />
              Project Tasks
            </Link>
          </li>

          {/* Notifications */}

          <li>
            <Link
              to="/notifications"
              className="relative flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
            >
              <FaBell />
              Notifications
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
          </li>

          {/* <li>
            <Link
              to="/client/request-meeting"
              className="flex items-center gap-3 px-5 py-3 rounded hover:bg-slate-800"
            >
              <FaCalculator /> Request Meeting
            </Link>
          </li> */}

          {/* Change Password */}

          <li>
            <Link
              to="/change-password"
              className="flex items-center gap-3 px-5 py-3 rounded hover:bg-slate-800"
            >
              <FaLock />
              Change Password
            </Link>
          </li>
        </ul>
      </div>

      {/* Content */}

      <div className="flex-1 bg-slate-100 p-6">{children}</div>
    </div>
  );
};

export default ClientLayout;
