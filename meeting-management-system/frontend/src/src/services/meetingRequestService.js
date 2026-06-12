import api from "./api";

export const createMeetingRequest = (data) =>
  api.post("/meeting-requests", data);

export const getMeetingRequests = () => api.get("/meeting-requests");

export const approveMeetingRequest = (id) =>
  api.put(`/meeting-requests/approve/${id}`);

export const rejectMeetingRequest = (id) =>
  api.put(`/meeting-requests/reject/${id}`);
