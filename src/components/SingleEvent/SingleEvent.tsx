import "./SingleEvent.css";
import { useState, useEffect } from "react";
import { getSingleEvent } from "../../../api";
import { useParams } from "react-router-dom";
import { Event } from "../../types/types";
import Map from "../Map/Map";
import "./SingleEvent.css";

import { formatEventTimeRange } from "../../utils/formatEventTime";

const SingleEvent: React.FC = () => {
  const [eventData, setEventData] = useState<Event | null>(null);
  const { event_id } = useParams<{ event_id: string }>();

  useEffect(() => {
    if (event_id) {
      const id = parseInt(event_id, 10);
      if (!isNaN(id)) {
        getSingleEvent(id)
          .then((response) => {
            setEventData(response);
          })
          .catch((error) => console.error("Error fetching event:", error));
      }
    }
  }, [event_id]);

  if (!eventData) {
    return <p>Loading...</p>;
  }

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
    </div>
  );
};

export default SingleEvent;
