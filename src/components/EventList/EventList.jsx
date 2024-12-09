// src/components/EventList/EventList.jsx
import React from 'react';
import EventItem from '../EventItem/EventItem';
import styles from './EventList.module.css';

const events = [
  {
    id: 1,
    title: 'Computer Science Meeting',
    description: 'Everyone is always invited to the meeting.',
  },
  {
    id: 2,
    title: 'Front-end Frameworks Presentation',
    description: 'Currently displaying my presentation, you are invited to read this.',
  },
  {
    id: 3,
    title: 'Filler content',
    description: 'This is filler content for the event list.',
  },
  {
    id: 4,
    title: 'React Workshop',
    description: 'Join us for an in-depth React workshop. Learn hooks, state management, and more!',
  },
];

const EventList = () => {
  return (
    <section className={styles.eventsSection}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </section>
  );
};

export default EventList;
