import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllEvents } from "../../../api";
import EventCard from "../EventCard/EventCard";
import styles from "./DisplayAllEvents.module.css";

const DisplayAllEvents: React.FC = () => {
  const { category } = useParams();
  const [eventData, setEventData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    getAllEvents(category)
      .then((response) => {
        const shuffledEvents = response.sort(() => Math.random() - 0.5);
        setEventData(shuffledEvents);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load events.");
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading events...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}
      {eventData.length > 0 ? (
        <div className={styles.grid}>
          {eventData.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      ) : (
        <p className={styles.noEvents}>No events available</p>
      )}
    </div>
  );
};

export default DisplayAllEvents;
