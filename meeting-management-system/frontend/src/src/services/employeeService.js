import api from "./api";

export const createEmployee = (data) => api.post("/employees", data);

export const getEmployees = () => api.get("/employees");

export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);

export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
