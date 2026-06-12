import { useEffect, useState } from "react";
import { getUnreadCount } from "../services/notificationService";
import { FaBell, FaChartBar, FaLock, FaTable, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmployeeLayout = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await getUnreadCount();

      console.log("Unread Count API:", res.data);

      setUnreadCount(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-slate-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Employee Panel</h2>

        <ul className="space-y-3">
          <li>
            <Link
              to="/employee/dashboard"
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
            >
              <FaChartBar />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
              to="/employee/tasks"
            >
              <FaTable />
              My Tasks
            </Link>
          </li>

          {/* <li>
            <Link
              to="/employee/profile "
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
            >
              <FaUsers />
              Profile
            </Link>
          </li> */}
          <li>
            <Link
              to="/notifications"
              className="relative flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
            >
              <FaBell />
              Notification
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/change-password"
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800"
            >
              <FaLock />
              Change Password
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 bg-slate-100 p-6">{children}</div>
    </div>
  );
};

export default EmployeeLayout;
