import {
  FaUsers,
  FaUserTie,
  FaTasks,
  FaCalendarAlt,
  FaChartBar,
  FaFolder,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed">
      <div className="p-5 text-2xl font-bold border-b border-slate-700">
        DGROW ERP
      </div>

      <ul className="mt-5">
        <li>
          <Link
            to="/admin"
            className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
          >
            <FaChartBar />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/admin/employees"
            className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
          >
            <FaUsers />
            Employees
          </Link>
        </li>

        <li>
          <Link
            to="/admin/clients"
            className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
          >
            <FaUserTie />
            Clients
          </Link>
        </li>
        <li>
          <Link
            to="/admin/projects"
            className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
          >
            <FaFolder />
            Projects
          </Link>
        </li>
        <li>
          <Link
            to="/admin/tasks"
            className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
          >
            <FaTasks />
            Tasks
          </Link>
        </li>

        <li>
          <Link
            to="/admin/create-meeting"
            className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
          >
            <FaCalendarAlt />
            Meetings
          </Link>
        </li>
        <li>
          <Link
            to="/admin/meeting-requests"
            className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
          >
            <FaCalendarAlt /> Meeting Requests
          </Link>
        </li>
        {/* <Link to="/notifications" className="relative">
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {unreadCount}
            </span>
          )}
        </Link> */}
      </ul>
    </div>
  );
};

export default Sidebar;
