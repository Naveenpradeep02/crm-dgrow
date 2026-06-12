import api from "./api";

export const getClientTasks = () => api.get("/client/tasks");
