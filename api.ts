import axios from "axios";

const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;

const eventRightApi = axios.create({
  baseURL: BACKEND_API,
});

export const getAllEvents = () => {
  return eventRightApi.get("/events").then(({ data }) => {
    return data.events;
  });
};
