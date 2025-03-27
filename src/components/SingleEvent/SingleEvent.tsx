import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
import styles from "./SingleEvent.module.css";

const getOptimizedImageUrl = (url: string, width: number = 800): string =>
  url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);

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
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading event details...</p>
      </div>
    );
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
    <div className={styles.container}>
      <h1 className={styles.title}>{eventData.title}</h1>
      {eventData.image && (
        <div className={styles.imageWrapper}>
          <img
            src={getOptimizedImageUrl(eventData.image, 800)}
            alt={eventData.title}
            className={styles.eventImage}
            loading="lazy"
          />
        </div>
      )}
      <p className={styles.time}>
        {formatEventTimeRange(eventData.start_time, eventData.end_time)}
      </p>
      <p className={styles.address}>{eventData.address}</p>
      <p className={styles.description}>{eventData.description}</p>
      <p className={styles.details}>{eventData.details}</p>
      {eventData.location && (
        <div className={styles.mapWrapper}>
          <Map location={eventData.location} />
        </div>
      )}
      <div className={styles.calendarSection}>
        <button className={styles.calendarButton} onClick={handleAddToCalendar}>
          Add to Calendar
        </button>
      </div>
      {user && isStaff && (
        <div className={styles.amendSection}>
          <Link to={`/amend-event/${event_id}`} className={styles.amendLink}>
            Amend Event
          </Link>
        </div>
      )}
      {user && !isStaff && (
        <div className={styles.attendanceButtons}>
          <button
            className={styles.attendButton}
            disabled={alreadyAttending}
            onClick={handleAttendEvent}
          >
            Attend Event
          </button>
          <button
            className={styles.cancelButton}
            disabled={!alreadyAttending}
            onClick={handleCancelEvent}
          >
            Cancel Attendance
          </button>
        </div>
      )}
      <div className={styles.registeredUsers}>
        <h2 className={styles.registeredTitle}>Who's going?</h2>
        {usersLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading registered users...</p>
          </div>
        ) : usersError ? (
          <p className={styles.errorText}>{usersError}</p>
        ) : registeredUsers.length > 0 ? (
          <ul className={styles.userList}>
            {registeredUsers.map((attendee) => (
              <li key={attendee.user_id} className={styles.userItem}>
                {attendee.first_name} {attendee.last_name} (
                <em>{attendee.username}</em>)
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noUsers}>Currently no one signed up.</p>
        )}
      </div>
    </div>
  );
};

export default SingleEvent;
