import api from "./api";

// Get all notifications
export const getNotifications = () => {
  return api.get("/notifications");
};

// Get unread notification count
export const getUnreadCount = () => {
  return api.get("/notifications/unread-count");
};

// Mark notification as read
export const markNotificationRead = (id) => {
  return api.put(`/notifications/${id}/read`);
};
