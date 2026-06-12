import api from "./api";

export const createMeeting = (data) => api.post("/meetings", data);
