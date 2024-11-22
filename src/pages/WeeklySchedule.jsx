// src/pages/WeeklySchedule.jsx
import React from 'react';
import styles from './WeeklySchedule.module.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = Array.from({ length: 17 }, (_, i) => i + 8); // 8 AM to 12 AM

const WeeklySchedule = () => {
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
                <td key={day} className={styles.scheduleCell}>
                  {/* Placeholder for events */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
