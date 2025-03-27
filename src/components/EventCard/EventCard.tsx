import React from "react";
import { EventCardProps } from "../../types/types";
import { FaCodeFork } from "react-icons/fa6";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Map from "../Map/Map";
import styles from "./EventCard.module.css";

const getOptimizedImageUrl = (url: string, width: number = 300): string => {
  return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const renderIcon = () => {
    if (event.event_type === "Tech") {
      return <FaCodeFork className={styles.icon} />;
    } else if (event.event_type === "Sport") {
      return <MdOutlineSportsMartialArts className={styles.icon} />;
    } else if (event.event_type === "Culture") {
      return <IoColorPaletteOutline className={styles.icon} />;
    }
    return null;
  };

  return (
    <Link to={`/event/${event.event_id}`} className={styles.cardLink}>
      <div className={styles.card}>
        {event.image ? (
          <div className={styles.cardImage}>
            <img
              src={getOptimizedImageUrl(event.image, 300)}
              alt={event.title}
              className={styles.eventImage}
              loading="lazy"
            />
          </div>
        ) : (
          <div className={styles.cardMap}>
            <Map location={event.location} />
          </div>
        )}
        <div className={styles.cardDetails}>
          <header className={styles.cardHeader}>
            <h2 className={styles.title}>{event.title}</h2>
            <div className={styles.iconContainer}>{renderIcon()}</div>
          </header>
          {event.description && (
            <p className={styles.description}>
              {event.description.length > 100
                ? event.description.substring(0, 100) + "..."
                : event.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
