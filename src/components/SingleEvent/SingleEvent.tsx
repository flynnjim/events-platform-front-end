import "./SingleEvent.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Event, User } from "../../types/types";
import { getSingleEvent, getRegisteredUsers } from "../../../api";
import Map from "../Map/Map";
import { formatEventTimeRange } from "../../utils/formatEventTime";
import { getGoogleCalendarLink } from "../../utils/calendarUtils";

const SingleEvent: React.FC = () => {
  const [eventData, setEventData] = useState<Event | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  const { event_id } = useParams<{ event_id: string }>();

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
            setRegisteredUsers(users);
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

      <div className="registered-users-section">
        <h2>Who's going?</h2>
        {usersLoading ? (
          <p>Loading registered users...</p>
        ) : usersError ? (
          <p>{usersError}</p>
        ) : registeredUsers.length > 0 ? (
          <ul>
            {registeredUsers.map((user) => (
              <li key={user.user_id}>
                {user.first_name} {user.last_name} (<em>{user.username}</em>)
              </li>
            ))}
          </ul>
        ) : (
          <p>No users registered for this event.</p>
        )}
      </div>
    </div>
  );
};

export default SingleEvent;
