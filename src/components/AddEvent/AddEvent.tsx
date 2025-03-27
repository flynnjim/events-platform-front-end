import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../api";
import { fetchGeocode } from "../../utils/geocoderApi";
import { useAuth } from "../../contexts/AuthContex";
import { NewEventData } from "../../types/types";
import CloudinaryImageUpload from "../CloudinaryImageUpload/CloudinaryImageUpload";
import styles from "./AddEvent.module.css";

const AddEventPage: React.FC = () => {
  const { user } = useAuth();
  const created_by = user?.user_id || 0;
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const startTimestamp = new Date(startTime).getTime();
      const endTimestamp = new Date(endTime).getTime();
      const geocodeResults = await fetchGeocode(address);
      if (!geocodeResults || geocodeResults.length === 0) {
        throw new Error("No geocode results found for the provided address.");
      }
      const { lat, lon } = geocodeResults[0];
      const newEvent: NewEventData = {
        title,
        description,
        event_type: eventType,
        details,
        address,
        start_time: startTimestamp,
        end_time: endTimestamp,
        location: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        },
        image: imageUrl,
      };
      const createdEvent = await createEvent(created_by, newEvent);
      navigate(`/event/${createdEvent.event_id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to add event. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Add Event</h1>
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
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            required
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
            required
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
            onChange={(e) => setDetails(e.target.value)}
            className={styles.textarea}
            required
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
            onChange={(e) => setAddress(e.target.value)}
            className={styles.input}
            required
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
            required
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
            required
          />
        </div>
        <CloudinaryImageUpload onUpload={(url: string) => setImageUrl(url)} />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
