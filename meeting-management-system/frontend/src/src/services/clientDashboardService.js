import api from "./api";

export const getClientDashboard = () => {
  return api.get("/client/dashboard");
};
