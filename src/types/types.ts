export interface Event {
  event_id: number;
  title: string;
  description: string;
  event_type: string;
  details: string;
  location: { latitude: number; longitude: number };
  address: string;
  created_by: number;
  start_time: number;
  end_time: number;
  image: string;
}

export interface NewEventData {
  title: string;
  description: string;
  event_type: string;
  details: string;
  address: string;
  start_time: number;
  end_time: number;
  location: { latitude: number; longitude: number };
  image: string;
}

export interface User {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
}

export interface EventCardProps {
  event: Event;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface MapProps {
  location: Location;
}

export interface AuthContextProps {
  user: User | null;
  isStaff: boolean;
  setUser: (user: User | null) => void;
  setIsStaff: (isStaff: boolean) => void;
}
