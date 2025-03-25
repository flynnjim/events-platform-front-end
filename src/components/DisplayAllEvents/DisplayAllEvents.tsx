import "./DisplayAllEvents.css";
import { useState, useEffect } from "react";
import { getAllEvents } from "../../../api";
import EventCard from "../EventCard/EventCard";
// import { useAuth } from "../../contexts/AuthContex";

const DisplayAllEvents = () => {
  // const { user, isStaff } = useAuth();
  // console.log(user, isStaff);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    getAllEvents().then((response) => {
      const shuffledEvents = response.sort(() => Math.random() - 0.5);
      setEventData(shuffledEvents);
    });
  }, []);

  return (
    <div className="event-cards">
      {eventData.length > 0 ? (
        eventData.map((event, index) => {
          return <EventCard key={index} event={event} />;
        })
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default DisplayAllEvents;
