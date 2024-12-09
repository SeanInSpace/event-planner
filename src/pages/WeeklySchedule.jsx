// src/pages/WeeklySchedule.jsx
import React, { useState, useEffect } from 'react';
import styles from './WeeklySchedule.module.css';
import { useNavigate } from 'react-router-dom';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = Array.from({ length: 17 }, (_, i) => i + 8); // 8 AM to 12 AM

const WeeklySchedule = () => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    day: '',
    hour: 0,
  });

  const navigate = useNavigate();

  // Handle clicks outside the context menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.contextMenu}`)) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };

    if (contextMenu.visible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);

  // Function to handle cell click
  const handleCellClick = (event, day, hour) => {
    event.preventDefault();
    // Get the position of the click
    const rect = event.currentTarget.getBoundingClientRect();
    setContextMenu({
      visible: true,
      x: rect.right + 5, // Positioning the menu to the right of the cell
      y: rect.top,
      day,
      hour,
    });
  };

  // Function to handle navigation to create event
  const handleCreateEvent = () => {
    // You can pass the day and hour as state or query params
    navigate('/create-event', { state: { day: contextMenu.day, hour: contextMenu.hour } });
    setContextMenu({ ...contextMenu, visible: false });
  };

  return (
    <div className={styles.scheduleContainer}>
      <table className={styles.scheduleTable}>
        <thead>
          <tr>
            <th>Time</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className={styles.timeCell}>{formatHour(hour)}</td>
              {daysOfWeek.map((day) => (
                <td
                  key={day}
                  className={styles.scheduleCell}
                  onClick={(e) => handleCellClick(e, day, hour)}
                >
                  {/* Placeholder for events */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className={styles.contextMenu}
          style={{
            top: contextMenu.y - 50,
            left: contextMenu.x - 120
          }}
        >
          <button onClick={handleCreateEvent} className={styles.contextMenuButton}>
            Create Event
          </button>
        </div>
      )}

    </div>
  );
};

// Helper function to format hours
const formatHour = (hour) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour > 12 ? hour - 12 : hour;
  return `${formattedHour}:00 ${period}`;
};

export default WeeklySchedule;
