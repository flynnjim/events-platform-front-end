import axios from "axios";
import { AxiosResponse } from "axios";
import { Event, User } from "./src/types/types";

const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;

const eventRightApi = axios.create({
  baseURL: BACKEND_API,
});

export const getAllEvents = (category: string | undefined) => {
  let baseString = "/events";
  if (category) {
    const validCategory =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    baseString += `?category=${validCategory}`;
  }
  return eventRightApi.get(baseString).then(({ data }) => {
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
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    console.error("Error fetching registered users:", error);
    throw error;
  }
};

export const loginUser = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const response: AxiosResponse<{ user: User }> = await eventRightApi.post(
      "/users/login",
      { username, password }
    );
    return response.data.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const loginStaff = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const response: AxiosResponse<{ staff: any }> = await eventRightApi.post(
      "/staff/login",
      { email, password }
    );
    const staffData = response.data.staff;

    const userData: User = {
      user_id: staffData.staff_id,
      first_name: staffData.first_name,
      last_name: staffData.last_name,
      username: staffData.email,
      email: staffData.email,
      password_hash: staffData.password_hash,
    };
    return userData;
  } catch (error) {
    console.error("Error logging in staff:", error);
    throw error;
  }
};

export const registerEvent = async (
  user_id: number,
  event_id: number
): Promise<any> => {
  const body = {
    user_id,
    event_id,
    registration_date: Date.now(),
    status: "Confirmed",
  };
  try {
    const response: AxiosResponse<any> = await eventRightApi.post(
      "/registration",
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error registering for event:", error);
    throw error;
  }
};

export const patchEvent = async (
  user_id: number,
  status: string
): Promise<any> => {
  const body = {
    user_id,
    status,
  };
  try {
    const response: AxiosResponse<any> = await eventRightApi.patch(
      "/registration",
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error changing event registration:", error);
    throw error;
  }
};

/**
 * Posts event data to the backend.
 * @param created_by The id of the user creating the event.
 * @param eventData The event details (without event_id or created_by).
 * @returns A promise resolving with the created Event.
 */
export const createEvent = async (
  created_by: number,
  eventData: Omit<Event, "event_id" | "created_by">
): Promise<Event> => {
  const response: AxiosResponse<{ event: Event }> = await eventRightApi.post(
    `/events/${created_by}`,
    eventData
  );
  return response.data.event;
};

export const updateEvent = async (updatedEvent: Event): Promise<Event> => {
  const response: AxiosResponse<{ event: Event }> = await eventRightApi.patch(
    "/events",
    updatedEvent
  );
  return response.data.event;
};
