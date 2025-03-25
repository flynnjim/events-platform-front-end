import "./SingleEvent.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Event, User } from "../../types/types";
import {
  getSingleEvent,
  getRegisteredUsers,
  registerEvent,
  patchEvent,
} from "../../../api";
import Map from "../Map/Map";
import { formatEventTimeRange } from "../../utils/formatEventTime";
import { getGoogleCalendarLink } from "../../utils/calendarUtils";
import { useAuth } from "../../contexts/AuthContex";

const SingleEvent: React.FC = () => {
  const [eventData, setEventData] = useState<Event | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  const { event_id } = useParams<{ event_id: string }>();
  const { user, isStaff } = useAuth();

  useEffect(() => {
    if (event_id) {
      const id = parseInt(event_id, 10);
      if (!isNaN(id)) {
        getSingleEvent(id)
          .then((response) => setEventData(response))
          .catch((error) => console.error("Error fetching event:", error));
      }
    }
  }, [event_id]);

  useEffect(() => {
    if (event_id) {
      const id = parseInt(event_id, 10);
      if (!isNaN(id)) {
        getRegisteredUsers(id)
          .then((users) => {
            setRegisteredUsers(users ?? []);
            setUsersLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching registered users:", error);
            setUsersError("Failed to load registered users.");
            setUsersLoading(false);
          });
      }
    }
  }, [event_id]);

  if (!eventData) {
    return <p>Loading event details...</p>;
  }

  const start = new Date(eventData.start_time);
  const end = new Date(eventData.end_time);

  const handleAddToCalendar = () => {
    const calendarLink = getGoogleCalendarLink(
      eventData.title,
      eventData.description,
      eventData.address,
      start,
      end
    );
    window.open(calendarLink, "_blank");
  };

  const handleAttendEvent = async () => {
    if (!user) return;
    const eventID = parseInt(event_id!, 10);

    if (
      !registeredUsers.some((attendee) => attendee.user_id === user.user_id)
    ) {
      setRegisteredUsers((prev) => [...prev, user]);
    }

    try {
      const result = await registerEvent(user.user_id, eventID);
      console.log("Registration successful:", result);
      const updatedUsers = await getRegisteredUsers(eventID);
      setRegisteredUsers(updatedUsers ?? []);
    } catch (error) {
      console.error("Error registering for event:", error);
      setRegisteredUsers((prev) =>
        prev.filter((attendee) => attendee.user_id !== user.user_id)
      );
    }
  };

  const handleCancelEvent = async () => {
    if (!user) return;
    const eventID = parseInt(event_id!, 10);

    setRegisteredUsers((prev) =>
      prev.filter((attendee) => attendee.user_id !== user.user_id)
    );

    try {
      const result = await patchEvent(user.user_id, "Cancelled");
      console.log("Cancellation successful:", result);
      const updatedUsers = await getRegisteredUsers(eventID);
      setRegisteredUsers(updatedUsers ?? []);
    } catch (error) {
      console.error("Error cancelling registration:", error);
      const updatedUsers = await getRegisteredUsers(eventID);
      setRegisteredUsers(updatedUsers ?? []);
    }
  };

  const alreadyAttending: boolean = user
    ? registeredUsers.some((attendee) => attendee.username === user.username)
    : false;

  return (
    <div className="single-event-container">
      <h1 className="single-event-header">{eventData.title}</h1>
      <p className="event-time">
        {formatEventTimeRange(eventData.start_time, eventData.end_time)}
      </p>
      <p className="event-address">{eventData.address}</p>
      <p className="event-description">{eventData.description}</p>
      <p className="event-details">{eventData.details}</p>
      {eventData?.location && (
        <div className="map-wrapper">
          <Map location={eventData.location} />
        </div>
      )}

      <div className="calendar-buttons">
        <button onClick={handleAddToCalendar}>Add to Calendar</button>
      </div>

      {user && !isStaff && (
        <div className="attendance-buttons">
          <button
            className="login-button"
            disabled={alreadyAttending}
            onClick={handleAttendEvent}
          >
            Attend Event
          </button>
          <button
            className="login-button"
            disabled={!alreadyAttending}
            onClick={handleCancelEvent}
          >
            Cancel Attendance
          </button>
        </div>
      )}

      <div className="registered-users-section">
        <h2>Who's going?</h2>
        {usersLoading ? (
          <p>Loading registered users...</p>
        ) : usersError ? (
          <p>{usersError}</p>
        ) : registeredUsers.length > 0 ? (
          <ul>
            {registeredUsers.map((attendee) => (
              <li key={attendee.user_id}>
                {attendee.first_name} {attendee.last_name} (
                <em>{attendee.username}</em>)
              </li>
            ))}
          </ul>
        ) : (
          <p>Currently no one signed up.</p>
        )}
      </div>
    </div>
  );
};

export default SingleEvent;
