// src/components/EventList/EventList.jsx
import React from 'react';
import EventItem from '../EventItem/EventItem';
import styles from './EventList.module.css';

const events = [
  {
    id: 1,
    title: 'Computer Science Meeting',
    description: 'Everyone is invited to the meeting this Monday. Room 109 at 6:30.',
  },
  {
    id: 2,
    title: 'React Workshop',
    description: 'Join us for an in-depth React workshop. Learn hooks, state management, and more!',
  },
  {
    id: 3,
    title: 'Networking Event',
    description: 'Expand your professional network at our monthly networking event.',
  },
  {
    id: 4,
    title: 'Web Development Conference',
    description: 'Stay updated with the latest trends in web development.',
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
