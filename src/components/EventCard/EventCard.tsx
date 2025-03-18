import React from "react";
import { EventCardProps } from "../../types/types";
import { FaCodeFork } from "react-icons/fa6";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";

import "./EventCard.css";
import Map from "../Map/Map";
import { Link } from "react-router-dom";

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/event/${event.event_id}`} className="event-card-link">
      <div className="event-card">
        <div className="event-card-details">
          <header className="details-header">
            <p>{event.title}</p>
            {event.event_type === "Tech" ? (
              <FaCodeFork className="tech-icon" />
            ) : event.event_type === "Sport" ? (
              <MdOutlineSportsMartialArts className="sport-icon" />
            ) : event.event_type === "Culture" ? (
              <IoColorPaletteOutline className="culture-icon" />
            ) : (
              <p>No icon available</p>
            )}
          </header>
          <main className="card-description"></main>
        </div>
        <div className="event-card-map">
          <Map location={event.location} />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
