import axios from "axios";
import { AxiosResponse } from "axios";
import { Event, User } from "./src/types/types";

const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;

const eventRightApi = axios.create({
  baseURL: BACKEND_API,
});

export const getAllEvents = () => {
  return eventRightApi.get("/events").then(({ data }) => {
    return data.events;
  });
};

export const getSingleEvent = async (event_id: number): Promise<Event> => {
  try {
    const response: AxiosResponse<{ event: Event }> = await eventRightApi.get(
      `/events/${event_id}`
    );
    return response.data.event;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const getRegisteredUsers = async (event_id: number): Promise<User[]> => {
  try {
    const response: AxiosResponse<{ users: User[] }> = await eventRightApi.get(
      `/users/registered/${event_id}`
    );
    return response.data.users;
  } catch (error) {
    console.error("Error fetching registered users:", error);
    throw error;
  }
};
