import "./DisplayAllEvents.css";
import { useState, useEffect } from "react";
import { getAllEvents } from "../../../api";
import EventCard from "../EventCard/EventCard";
import { useParams } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContex";

const DisplayAllEvents = () => {
  // const { user, isStaff } = useAuth();
  // console.log(user, isStaff);
  const { category } = useParams();

  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    getAllEvents(category).then((response) => {
      const shuffledEvents = response.sort(() => Math.random() - 0.5);
      setEventData(shuffledEvents);
    });
  }, [category]);

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
