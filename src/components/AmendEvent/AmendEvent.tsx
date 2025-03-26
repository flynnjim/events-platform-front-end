import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleEvent, updateEvent } from "../../../api";
import { fetchGeocode } from "../../utils/geocoderApi";
import { Event } from "../../types/types";
import styles from "./AmendEvent.module.css";

const formatDateForInput = (ms: number): string => {
  const date = new Date(ms);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

const AmendEvent: React.FC = () => {
  const { event_id } = useParams<{ event_id: string }>();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState<Event | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (event_id) {
      const id = parseInt(event_id, 10);
      if (!isNaN(id)) {
        getSingleEvent(id)
          .then((ev) => {
            setEventData(ev);
            setTitle(ev.title);
            setDescription(ev.description);
            setEventType(ev.event_type);
            setDetails(ev.details);
            setAddress(ev.address);
            setStartTime(formatDateForInput(ev.start_time));
            setEndTime(formatDateForInput(ev.end_time));
          })
          .catch((err) => {
            console.error("Error fetching event:", err);
            setError("Failed to load event details.");
          });
      }
    }
  }, [event_id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!eventData) {
      setError("Event data not loaded.");
      setLoading(false);
      return;
    }

    try {
      const updatedTitle = title || eventData.title;
      const updatedDescription = description || eventData.description;
      const updatedEventType = eventType || eventData.event_type;
      const updatedDetails = details || eventData.details;
      const updatedAddress = address || eventData.address;

      const updatedStartTime =
        startTime.trim() !== ""
          ? new Date(startTime).getTime()
          : eventData.start_time;
      const updatedEndTime =
        endTime.trim() !== ""
          ? new Date(endTime).getTime()
          : eventData.end_time;

      let updatedLocation = eventData.location;
      if (updatedAddress !== eventData.address) {
        const geocodeResults = await fetchGeocode(updatedAddress);
        if (geocodeResults && geocodeResults.length > 0) {
          const { lat, lon } = geocodeResults[0];
          updatedLocation = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          };
        }
      }

      const updatedEvent: Event = {
        event_id: eventData.event_id,
        title: updatedTitle,
        description: updatedDescription,
        event_type: updatedEventType,
        details: updatedDetails,
        address: updatedAddress,
        created_by: eventData.created_by,
        start_time: updatedStartTime,
        end_time: updatedEndTime,
        location: updatedLocation,
      };

      const result = await updateEvent(updatedEvent);
      console.log("Event updated:", result);
      navigate(`/event/${result.event_id}`);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update event. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!eventData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading event details...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Amend Event</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            placeholder={eventData.title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            placeholder={eventData.description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="eventType" className={styles.label}>
            Event Type
          </label>
          <select
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className={styles.select}
          >
            <option value="">Select event type</option>
            <option value="Tech">Technology</option>
            <option value="Sport">Sport</option>
            <option value="Culture">Culture</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="details" className={styles.label}>
            Details
          </label>
          <textarea
            id="details"
            value={details}
            placeholder={eventData.details}
            onChange={(e) => setDetails(e.target.value)}
            className={styles.textarea}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="address" className={styles.label}>
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            placeholder={eventData.address}
            onChange={(e) => setAddress(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="startTime" className={styles.label}>
            Start Time
          </label>
          <input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="endTime" className={styles.label}>
            End Time
          </label>
          <input
            id="endTime"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Event"}
        </button>
      </form>
    </div>
  );
};

export default AmendEvent;
