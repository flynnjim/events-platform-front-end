import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../api";
import { fetchGeocode } from "../../utils/geocoderApi";
import { useAuth } from "../../contexts/AuthContex";
import { NewEventData } from "../../types/types";

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
      };

      const createdEvent = await createEvent(created_by, newEvent);
      console.log("Event created:", createdEvent);

      navigate(`/event/${createdEvent.event_id}`);
    } catch (err: unknown) {
      console.error(err);

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
    <div>
      <h1>Add Event</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Type:</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
          >
            <option value="">Select event type</option>
            <option value="Tech">Technology</option>
            <option value="Sport">Sport</option>
            <option value="Culture">Culture</option>
          </select>
        </div>
        <div>
          <label>Details:</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
