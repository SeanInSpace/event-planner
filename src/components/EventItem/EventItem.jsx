// src/components/EventItem/EventItem.jsx
import React from 'react';
import styles from './EventItem.module.css';
import { ReactComponent as BookmarkIcon } from '../../assets/svgs/bookmark.svg';

const EventItem = ({ event }) => {
  const handleBookmark = () => {
    // Implement bookmark functionality
    alert(`Event "${event.title}" bookmarked!`);
  };

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventDetails}>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
      </div>
      <BookmarkIcon className={styles.bookmarkIcon} onClick={handleBookmark} title="Save for Later" />
    </div>
  );
};

export default EventItem;
