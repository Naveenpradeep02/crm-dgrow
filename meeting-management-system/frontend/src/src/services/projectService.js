import api from "./api";

export const createProject = (data) => api.post("/projects", data);

export const getProjects = () => api.get("/projects");

export const updateProject = (id, data) => api.put(`/projects/${id}`, data);

export const deleteProject = (id) => api.delete(`/projects/${id}`);
