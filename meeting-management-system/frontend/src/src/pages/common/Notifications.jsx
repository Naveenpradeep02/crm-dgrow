import { useEffect, useState } from "react";

import {
  getNotifications,
  markNotificationRead,
} from "../../services/notificationService";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();

      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border p-4 rounded ${
              notification.is_read ? "bg-gray-100" : "bg-blue-50"
            }`}
          >
            <h3 className="font-bold">{notification.title}</h3>

            <p>{notification.message}</p>

            <small>{new Date(notification.created_at).toLocaleString()}</small>

            {!notification.is_read && (
              <button
                onClick={() => handleRead(notification.id)}
                className="ml-4 bg-blue-600 text-white px-3 py-1 rounded"
              >
                Mark Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
