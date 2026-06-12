import api from "./api";

export const getClientProjects = () => api.get("/client/projects");
