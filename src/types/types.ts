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
