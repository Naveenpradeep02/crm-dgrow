import api from "./api";

export const getMyTasks = () => api.get("/tasks/employee");

export const updateTaskStatus = (id, data) =>
  api.put(`/tasks/status/${id}`, data);

export const updateTaskProgress = (id, data) =>
  api.put(`/tasks/progress/${id}`, data);
