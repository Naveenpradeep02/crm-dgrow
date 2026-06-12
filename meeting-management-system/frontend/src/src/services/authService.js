import api from "./api";

export const forgotPassword = (data) => api.post("/auth/forgot-password", data);

export const resetPassword = (data) => api.post("/auth/reset-password", data);

export const changePassword = (data) => api.put("/auth/change-password", data);
